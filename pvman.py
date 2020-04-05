from epics import PV
from flask import request
from flask_socketio import emit

from app import app, socket

timeout = 10

class PvManager():
    def __init__(self):
        self._pvs = {}

    def _add_pv_(self, pvname):
        self._pvs[pvname] = PV(pvname, auto_monitor=True)

    def _rm_pv_(self, pvname):
        self._pvs[pvname].disconnect()
        del self._pvs[pvname]

    def get_pv(self, pvname):
        if pvname not in self._pvs:
            self._add_pv_(pvname)
        return self._pvs[pvname]

    def get(self, pvname):
        pv = self.get_pv(pvname)
        return pv.get(as_string=True, use_monitor=False, timeout=timeout)

    def put(self, pvname, value):
        pv = self.get_pv(pvname)
        if pv.put(str(value), wait=True, timeout=timeout) < 0:
            return None
        else:
            return True

    def monitor(self, pvname):
        def update(pvname=None, value=None, **kwargs):
            socket.emit(pvname, value)
        pv = self.get_pv(pvname)
        if len(pv.callbacks):
            return
        pv.add_callback(update)

    def unmonitor(self, pvname):
        self._rm_pv_(pvname)
