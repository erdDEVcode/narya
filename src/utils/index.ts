import chalk from 'chalk'

let hasError = false

export const exit = () => {
  process.exit(hasError ? -1 : 0)
}

export const logError = (msg: string) => {
  hasError = true
  console.error(chalk.red(msg))
}

const _log = (...msgs: any[]) => {
  console.log(`\n${msgs.join(' ')}`)
}

export const logTrace = (msg: string) => {
  _log(chalk.white(msg))
}

export const logWarn = (msg: string) => {
  _log(chalk.yellow(msg))
}

export const logInfo = (msg: string, ...more: any[]) => {
  const args = [chalk.cyan(msg)].concat(more.map(m => chalk.bold(m)))
  _log(...args)
}

export const sleep = (seconds: number) => new Promise(resolve => setTimeout(resolve, seconds * 1000))