from pvman import PvManager

class RoomManager():
    def __init__(self):
        self._pvman = PvManager()
        self._rooms = {}

    def _add_user(self, user, room):
        if room not in self._rooms:
            self._rooms[room] = []
        self._rooms[room].append(user)

    def _rm_user(self, user, room):
        if room in self._rooms:
            self._rooms[room].remove(user)

    def add(self, user, room):
        self._add_user(user, room)
        self._pvman.monitor(room)

    def remove(self, user, room):
        self._rm_user(user, room)
        if room in self._rooms and len(self._rooms[room]) < 1:
            self._pvman.unmonitor(room)
