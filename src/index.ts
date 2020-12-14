import * as child from 'child_process'
import assert from 'assert'
import { execute } from './commands/start'

let instance: child.ChildProcess | undefined

export const getChildProcess = () => instance

export const start = async () => {
  assert(!instance, 'Already started')
  instance = await execute({ async: true, quiet: true }) as child.ChildProcess
}

export const stop = async () => {
  assert(instance, 'Not started')
  instance.kill()
  instance = undefined
}