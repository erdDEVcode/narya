# DEPRECATED - narya is now deprecated and no longer maintained. Please follow the [official docs](https://docs.elrond.com/developers/setup-local-testnet/) to run a local network.

[![NPM module](https://badge.fury.io/js/narya.svg)](https://badge.fury.io/js/narya)
[![Join the community](https://img.shields.io/badge/Chat%20on-Telegram-brightgreen.svg?color=0088cc)](https://t.me/erdDEV)
[![Follow on Twitter](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&label=Follow&maxAge=2592000)](https://twitter.com/erd_dev)

Run an [Elrond test network](https://docs.elrond.com/developers/setup-a-local-testnet) with a single command.

## Getting started

Pre-requisites:

* [Docker](https://www.docker.com/)
* [Node.js](https://nodejs.org) 12 or above

Run it:

```
$ npx narya
```

You can install it as a global Node module and run it:

```
$ npm i -g narya
$ narya
```

Once the Docker container is up and running the [proxy](https://github.com/ElrondNetwork/elrond-proxy-go) can be accessed at http://localhost:7950

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

You can also get a reference to the test account wallets:

```js
const { WALLETS } = require('narya)
const { BasicWallet } = require('elrondjs')

// output Alice's address
console.log( WALLETS.alice.bech32 ) // "erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th"

// use it for signing transactions
const wallet = BasicWallet.fromJsonKeyFileString(JSON.stringify(WALLETS.alice), 'password')
await wallet.signTransaction(...)
```

## Contributors guide

Build docker image:

```
docker build --tag hiddentao/erdnet:latest .
```

Run docker image:

```
docker run --rm -it -p 127.0.0.1:7950:7950/tcp hiddentao/erdnet:latest
```

If you need to debug, run docker image with bash:

```
docker run --rm -it -p 127.0.0.1:7950:7950/tcp hiddentao/erdnet:latest /bin/bash
```

**Publishing**

```
docker login
docker push hiddentao/erdnet:latest
```

**NPM package**

To build the package and watch for changes:

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

To run local tests:

```shell
npm test
```

## License

MIT
