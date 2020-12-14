import glob from 'glob'
import fs from 'fs'
import path from 'path'

export const WALLETS = glob.sync(path.join(__dirname, '..', '..', 'wallets', '*.json')).reduce((m, file) => {
  m[path.basename(file, '.json')] = JSON.parse(fs.readFileSync(file).toString('utf8'))
  return m
}, {} as Record<string, any>)
