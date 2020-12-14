import spawn from 'cross-spawn'
import commandExists from 'command-exists'
import * as child from 'child_process'

import { CommandMeta } from '../types'
import { logTrace, logInfo, logWarn, logError } from '../utils'

export const getMeta = (): CommandMeta => ({
  summary: 'Start a local test network.',
  options: [
    {
      name: 'verbose',
      description: 'Enable verbose logging (default: off)',
      type: Boolean,
    },
    {
      name: 'quiet',
      description: 'Enable quiet mode (default: off)',
      type: Boolean,
    }
  ],
})

const DOCKER_ARGS = 'run --rm -p 127.0.0.1:7950:7950/tcp hiddentao/erdnet:latest'

export interface Options {
  async?: boolean,
  verbose?: boolean,
  quiet?: boolean,
}

export const execute = async ({ async, quiet, verbose }: Options): Promise<undefined | child.ChildProcess> => {
  if (!quiet) {
    logInfo('Starting network ...')
  }

  if (verbose) {
    logTrace('Checking for: docker')
  }

  const dockerExists = await commandExists('docker')
  if (!dockerExists) {
    logError('Docker (https://docker.com) not found. Please ensure you have it installed and enabled in your PATH.')
    return
  }

  if (verbose) {
    logTrace('Starting container')
  }

  if (async) {
    return spawn('docker', DOCKER_ARGS.split(' '), { stdio: 'ignore' })
  } else {
    if (!quiet) {
      logInfo('Proxy endpoint: http://localhost:7950')
    }

    const child = spawn.sync('docker', DOCKER_ARGS.split(' '), { stdio: verbose ? 'inherit' : 'ignore' })

    if (child.error || child.signal) {
      throw new Error(`Child process exited with signal: ${child.signal}, error: ${child.error?.toString()}`)
    }
  }
}