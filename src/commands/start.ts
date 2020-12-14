import spawn from 'cross-spawn'
import commandExists from 'command-exists'
import * as child from 'child_process'

import { CommandMeta } from '../types'
import { logTrace, logInfo, logWarn, logError } from '../utils'

export const getMeta = (): CommandMeta => ({
  summary: 'Start a local test network.',
  options: [
    {
      name: 'quiet',
      description: 'Enable quiet mode (default: off)',
      type: Boolean,
    }
  ],
})

const DOCKER_API_ARGS = 'run --rm -p 127.0.0.1:7950:7950/tcp hiddentao/erdnet:latest'
const DOCKER_CLI_ARGS = 'run --rm -it -p 127.0.0.1:7950:7950/tcp hiddentao/erdnet:latest'

export interface Options {
  async?: boolean,
  verbose?: boolean,
  quiet?: boolean,
}

export const execute = async ({ async, quiet }: Options): Promise<undefined | child.ChildProcess> => {
  if (!quiet) {
    logInfo('Starting network ...')
  }

  if (!quiet) {
    logTrace('Checking for: docker')
  }

  const dockerExists = await commandExists('docker')
  if (!dockerExists) {
    logError('Docker (https://docker.com) not found. Please ensure you have it installed and enabled in your PATH.')
    return
  }

  if (!quiet) {
    logTrace('Starting container')
  }

  if (async) {
    return spawn('docker', DOCKER_API_ARGS.split(' '), { stdio: 'ignore' })
  } else {
    if (!quiet) {
      logInfo('Proxy endpoint: http://localhost:7950')
    }

    const child = spawn('docker', DOCKER_CLI_ARGS.split(' '), { stdio: quiet ? 'ignore' : 'inherit' })

    return new Promise((resolve, reject) => {
      child.on('exit', (code, signal) => {
        if (code) {
          reject(new Error(`Exited badly: ${code}, ${signal}`))
        } else {
          resolve()
        }
      })

      child.on('error', (err) => {
        reject(err)
      })
    })
  }
}