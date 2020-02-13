#!/usr/bin/env node
const publish = require('./src/publish')

const yargs = require('yargs')
  .option('dry-run', {
    describe: 'Print what will be done without doing it',
    type: 'boolean'
  })
  .option('dir', {
    describe: 'Path to the directory that contains the package.json to publish',
    type: 'string',
    default: '.'
  })
  .alias('help', 'h')

const options = yargs.argv

if (options.help) {
  yargs.showHelp()
  process.exit(0)
}

const npmArgs = options._
delete options._

publish(options, npmArgs)
  .then(context => {
    console.warn(`published! ${JSON.stringify(context, null, 2)}`)
  })
  .catch(error => {
    console.error(error)
    process.exitCode = 1
  })
