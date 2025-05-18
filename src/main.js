import normalizeException from 'normalize-exception'

import { getOpts } from './options/main.js'
import { printError } from './print/main.js'

export { validateOptions } from './options/validate.js'

// Print CLI errors and exit, depending on the error class
const prettyCliError = (error, opts) => {
  const errorA = normalizeException(error)
  const {
    error: errorB,
    opts: { stack, props, colors, icon, header },
  } = getOpts(opts, errorA)
  return printError({ error: errorB, stack, props, colors, icon, header })
}

export default prettyCliError
