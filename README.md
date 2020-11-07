# erdnet

Easily deploy an [Elrond local testnet](https://docs.elrond.com/developers/setup-a-local-testnet).

## How to use

Pre-requisites:

* [Docker](https://www.docker.com/)

Run:

```
docker run --rm -it -p 127.0.0.1:7950:7950/tcp hiddentao/erdnet:latest
```

Once the container is up and running the proxy can be accessed at http://localhost:7950

The pre-configured testnet wallets are the same as the ones at https://github.com/ElrondNetwork/elrond-sdk/tree/master/erdpy/testnet/wallets/users 

## Development

Build:

```
docker build --tag hiddentao/erdnet:latest .
```

Run:

```
docker run -p --rm -it 127.0.0.1:7950:7950/tcp hiddentao/erdnet:latest
```

Publish:

```
docker login
docker push hiddentao/erdnet:latest
```