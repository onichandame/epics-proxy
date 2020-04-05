from epics import PV

timeout = 10

class PvManager():
    def __init__(self):
        self._pvs = {}

    def _add_pv_(self, pvname):
        self._pvs[pvname] = PV(pvname, auto_monitor=True)

    def _rm_pv_(self, pvname):
        del self._pvs[pvname]

    def get_pv(self, pvname):
        if pvname not in self._pvs:
            self._add_pv_(pvname)
        return self._pvs[pvname]

    def get(self, pvname):
        pv = self.get(pvname)
        return pv.get(as_string=True, use_monitor=False, timeout=timeout)

    def put(self, pvname, value):
        pv = self.get(pvname)
        if pv.put(str(value), wait=True, timeout=timeout) < 0:
            return None
        else:
            return True

    def monitor(self, pvname, callback):
        if not callable(callback):
            return None
        pv = self.get(pvname)
        return pv.add_callback(callback)

    def unmonitor(self, pvname, index):
        pv = self.get(pvname)
        if isinstance(index, int):
            pv.remove_callback(int)
        if not len(pv.callbacks):
            pv.disconnect()
