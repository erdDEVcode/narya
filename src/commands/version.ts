import { CommandMeta } from '../types'

const { version } = require('../../../package.json')

export const getMeta = (): CommandMeta => ({
  summary: 'Display version.',
})

export const execute = async (): Promise<void> => {
  console.log(version)
}