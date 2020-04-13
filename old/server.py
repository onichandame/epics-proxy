from flask import Flask, request, Response
from flask_socketio import SocketIO, join_room, emit

from pvman import PvManager
from roomman import RoomManager
from app import app, socket

pv_manager = PvManager()
room_manager = RoomManager()

@app.route('/<pvname>', methods=['GET'])
def get(pvname):
    value = pv_manager.get(pvname)
    if value is None:
        return Response(status=500)
    else:
        return Response(value, status=200)

@app.route('/<pvname>', methods=['PUT'])
def put(pvname):
    if pv_manager.put(pvname, request.data):
        return Response(status=200)
    else:
        return Response(status=400)

@socket.on('monitor')
def monitor(pvname):
    user = request.sid
    join_room(pvname)
    room_manager.add(user, pvname)

@socket.on('disconnect')
def on_leave():
    uid = request.sid
    room_manager.remove(uid)

@socket.on('leave')
def on_leave():
    uid = request.sid
    room_manager.remove(uid)

if __name__ == '__main__':
    socket.run(app, port=80)
