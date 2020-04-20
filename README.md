# EPICS proxy

A web server bridging IOC and clients such as Express.js or Django through GraphQL.

# Author

[onichandame](https://github.com/onichandame)

# Usage

## Basic Usage

```bash
node dist
```

Now the Channel Access is available to other clients through GraphQL.

note: before running the command above, a valid EPICS base installation needs to exist. `EPICS_HOST_ARCH` and `EPICS_BASE` need to be set as well. Otherwise a pre-compiled binary will be used, which will not be guaranteed to work on your system.

## Recommended Usage

It is recommended to run the server as a container.

For example:

```docker
docker run -d onichandame/epics-proxy:latest
```

# API

## caget

```graphql
Query: {
  caget(pvname) {
    value
  }
}
```

## caput

```graphql
Mutation: {
  caput(pvname, value)
}
```

returns true on success, false otherwise.

## camonitor

```graphql
Subscription {
  camonitor(pvname) {
    value
  }
}
```
