import { argv } from 'node:process'

import prettyCliError from 'pretty-cli-error'

const main = () => {
  const handlerTimeout = Number(argv[2])
  const logicTimeout = Number(argv[3])

  try {
    runFunc(logicTimeout)
  } catch (error) {
    prettyCliError(error, { timeout: handlerTimeout })
  }
}

const runFunc = (logicTimeout) => {
  setTimeout(noop, logicTimeout)
  throw new Error('test')
}

const noop = () => {}

main()
