import normalizeException from 'normalize-exception'

import { applyClassesOpts } from './classes.js'
import { applyDefaultOpts, DEFAULT_OPTS } from './default.js'
import { validateOptions } from './validate.js'

// Normalize and validate options
export const getOpts = (opts, error) => {
  try {
    return safeGetOpts(opts, error)
  } catch (error_) {
    // eslint-disable-next-line fp/no-mutation
    error_.message = `${PACKAGE_NAME} invalid usage: ${error_.message}`
    const errorA = normalizeException(error_)
    return { error: errorA, opts: INVALID_OPTS }
  }
}

const PACKAGE_NAME = 'pretty-cli-error'

const safeGetOpts = (opts, error) => {
  validateOptions(opts)
  const optsA = applyClassesOpts(error, opts)
  const optsB = applyDefaultOpts(optsA)
  return { error, opts: optsB }
}

// Options used when invalid input is passed
const INVALID_OPTS = { ...DEFAULT_OPTS }
