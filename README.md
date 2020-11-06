# erdnet

Easily deploy an [Elrond local testnet](https://docs.elrond.com/developers/setup-a-local-testnet) with a 1-line command.

## How to use

Pre-requisites:

* [Docker](https://www.docker.com/)

Run:

```
docker run -p 127.0.0.1:7950:7950/tcp hiddentao/erdnet:1.0.0
```

Once the container is up and running the proxy can be accessed at http://localhost:7950

The pre-configured testnet wallets are the same as the ones at https://github.com/ElrondNetwork/elrond-sdk/tree/master/erdpy/testnet/wallets/users 

## Building a new Docker image

Build:

```
docker build --tag erdnet:<version> .
```

Run:

```
docker run -p 127.0.0.1:7950:7950/tcp erdnet:<version>
```

Publish:

```
```