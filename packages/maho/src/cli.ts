#!/usr/bin/env node
import { readFileSync } from 'fs'
import { join } from 'path'
import { cac } from 'cac'
import { maho } from './node'
const cli = cac('maho')

cli.command('[dir]', 'Serve a directory in dev mode').action(async (dir) => {
  const app = maho({ dir, dev: true })
  await app.startServer()
})

cli.command('start [dir]', 'Serve a directory in prod mode').action(async (dir) => {
  const app = maho({ dir, dev: false })
  await app.startServer()
})

cli.command('build [dir]', 'Build a directory').action(async (dir) => {
  const app = maho({ dir, dev: false })
  await app.build()
})

const pkg = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8'))
cli.version(pkg.version)
cli.help()

cli.parse()