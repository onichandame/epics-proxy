from unittest import TestCase
from unittest.mock import patch

from pvman import PvManager as subject

class TestPvMan(TestCase):
    def test_get_pv(self):
        man = subject()
        with patch.object(man, '_pvs', {}, create=True), patch('pvman.PV') as mock_PV:
            man.get_pv('asdf')
            mock_PV.assert_called_once_with('asdf', auto_monitor=True)
        with patch.object(man, '_pvs', {'asdf': []}, create=True), patch('pvman.PV') as mock_PV:
            self.assertEqual(man.get_pv('asdf'), [])
            mock_PV.assert_not_called()

    def test_get(self):
        man = subject()
        with patch.object(man, 'get_pv') as mock_get_pv:
            man.get('asdf')
            mock_get_pv.assert_called_once_with(as_string=True, )
