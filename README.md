# EPICS proxy

A web server bridging IOC and clients such as Express.js or Django.

# Author

[onichandame](https://github.com/onichandame)

# Usage

## Basic Usage

```python
python dist/server.py
```

Now the Channel Access is available to other clients through HTTP and websocket.

note: before running the command above, a valid EPICS base installation needs to exist. `EPICS_HOST_ARCH` and `EPICS_BASE` need to be set as well.

## Recommended Usage

It is recommended to run the server as a container.

For example:

```docker
docker run -d onichandame/epics-proxy
```

# Rest API

## HTTP GET /\<pvname\>

equivalent of `caget(\<pvname\>)`

## HTTP PUT /\<pvname\>

equivalent of `caput(\<pvname\>, value)` where the value is encoded in the body

## HTTP GET /?pvname[]=\<pvname\>

equivalent of `caget(\<pvname\>)`

## HTTP PUT /\<pvname\>

equivalent of `caput(\<pvname\>, value)` where the value is encoded in the body

## WebSocket

```javascript
const socket = new WebSocket('ws://localhost/\<pvname\>')
socket.addEventListener('message', event => console.log(`the current value is ${event.data}`))
```

equivalent of `camonitor(\<pvname\>)`
