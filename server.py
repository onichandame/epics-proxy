from flask import Flask, request, Response
from flask_socketio import SocketIO, join_room, emit

from pvman import PvManager

pv_manager = PvManager()

app = Flask(__name__)
socket = SocketIO(app)

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

@socket.on('connect')
def on_join(data):
    def handle(pvname=None, value=None, timestamp=None, **kwargs):
        emit(data['pvname'], {'value': value}, room=data['pvname'])
    join_room(data['pvname'])
    pv_manager.monitor(data['pvname'], handle)

@socket.on('leave')
def on_leave(data):
    pv_manager.unmonitor(data['pvname'])

if __name__ == '__main__':
    socket.run(app, port=80)
