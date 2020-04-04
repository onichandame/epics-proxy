from flask import Flask, request, Response
from flask_socketio import SocketIO, join_room
from epics import caget, caput, camonitor

app = Flask(__name__)
socket = SocketIO(app)

@app.route('/<pvname>', methods=['GET'])
def get(pvname):
    return caget(pvname+'.VAL')

@app.route('/<pvname>', methods=['PUT'])
def put(pvname):
    if caput(pvname, request.data, wait=True, timeout=30):
        return Response(status=200)
    else:
        return Response(status=400)

@socket.on('join')
def monitor(data):
    def reply():
        return
    pvname = data['pvname']
    join_room(pvname)
    camonitor(pvname, callback=reply)
    return caget(pvname+'.VAL')

if __name__ == '__main__':
    socket.run(app, port=80)
