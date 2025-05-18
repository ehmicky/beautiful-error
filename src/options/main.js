import normalizeException from 'normalize-exception'

import { applyDefaultOpts, DEFAULT_OPTS } from './default.js'
import { validateOptions } from './validate.js'

// Normalize and validate options
export const getOpts = (error, opts) => {
  try {
    validateOptions(opts)
    const optsA = applyDefaultOpts(opts)
    return { error, opts: optsA }
  } catch (error_) {
    // eslint-disable-next-line fp/no-mutation
    error_.message = `${PACKAGE_NAME} invalid usage: ${error_.message}`
    const errorA = normalizeException(error_)
    return { error: errorA, opts: INVALID_OPTS }
  }
}

const PACKAGE_NAME = 'beautiful-error'

// Options used when invalid input is passed
const INVALID_OPTS = { ...DEFAULT_OPTS }
