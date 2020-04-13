from epics import PV

class Rooms():
    def __init__(self):
        self._rooms = {}

    def add(self, pvname):
        if pvname not in self._rooms:
            room = {}
            room.connections = 0
            room.
            self._rooms[pvname] = {}
            self._
        self._rooms[pvname] += 1

    def remove(self, pvname):
        if pvname in self._rooms:
            if isinstance(self._rooms[pvname], int):
                if self._rooms[pvname] > 0:
                    self._rooms[pvname] -= 1
            if self._rooms[pvname] < 1:
                del self._rooms[pvname]
