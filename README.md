# narya

Run a [local Elrond test network](https://docs.elrond.com/developers/setup-a-local-testnet).

## Getting started

Pre-requisites:

* [Docker](https://www.docker.com/)
* [Node.js](https://nodejs.org) 12 or above

Run it:

```
npx narya
```

You can install it as a global Node module and run it:

```
npm i -g narya
narya
```

Once the Docker container is up and running the [proxy](https://github.com/ElrondNetwork/elrond-proxy-go) can be accessed at http://localhost:7950

The pre-configured testnet wallets are the same as the ones at https://github.com/ElrondNetwork/elrond-sdk/tree/master/erdpy/testnet/wallets/users 

## Usage guide

You can use narya via the CLI tool or programmatically in Node. 

Note that the docker container is run in _auto-remove_ mode, meaning that as soon narya (or your Node.js that is using it programmatically) exits, the Docker container will also be stopped and removed.

**CLI: Command-line tool**

To start a local network:

```
$ npx narya
```

You can view all commands using `help`:

```
$ npx narya help


narya

  Deploy a local Elrond test network. 

Usage

  $ narya [command] [options] 

Commands

  start     Start a network.                                                             
  version   Display version.                                                             
  help      Print this usage guide. Use "help <command>" for help on a specific command. 
```

**Programmatic API**

In node.js:

```js
const { start, stop, getChildProcess } = require('narya')

await start() // start a network

const child = getChildProcess() // get the `ChildProcess` instance representing the docker container

await stop() // stop the started network
```

## Contributors guide

Build docker image:

```
docker build --tag hiddentao/erdnet:latest .
```

Run  docker image:

```
docker run --rm -it -p 127.0.0.1:7950:7950/tcp hiddentao/erdnet:latest
```

Publish  docker image:

```
docker login
docker push hiddentao/erdnet:latest
```

To build the tool and watch for changes:

```
npm run dev
```

To build for production:

```
npm run build
```

To publish a new release:

```
npm run release
```

## License

MIT
