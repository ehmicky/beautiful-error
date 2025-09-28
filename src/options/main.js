import normalizeException from 'normalize-exception'

import { DEFAULT_OPTS } from './default.js'
import { normalizeOptions } from './validate.js'

// Normalize and validate options
export const getOpts = (error, opts) => {
  try {
    return { error, classes: normalizeOptions(opts) }
  } catch (error_) {
    // eslint-disable-next-line fp/no-mutation
    error_.message = `${PACKAGE_NAME} invalid usage: ${error_.message}`
    const errorA = normalizeException(error_)
    return { error: errorA, classes: { default: INVALID_OPTS } }
  }
}

const PACKAGE_NAME = 'beautiful-error'

// Options used when invalid input is passed
const INVALID_OPTS = { ...DEFAULT_OPTS }
