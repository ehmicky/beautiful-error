import isPlainObj from 'is-plain-obj'

import { validateHeader } from '../header.js'
import { validateIcon } from '../icon.js'

// Validate option values.
// This is exported, although not documented.
export const validateOptions = (opts) => {
  if (opts === undefined) {
    return
  }

  if (!isPlainObj(opts)) {
    throw new Error(`options must be a plain object: ${opts}`)
  }

  Object.entries(opts).forEach(validateOpt)
}

const validateOpt = ([optName, optValue]) => {
  if (optValue === undefined) {
    return
  }

  const validator = VALIDATORS[optName]

  if (validator === undefined) {
    throw new Error(`"${optName}" is an unknown option`)
  }

  validator(optValue, optName)
}

const validateBooleanOpt = (value, optName) => {
  if (typeof value !== 'boolean') {
    throw new TypeError(`"${optName}" must be a boolean: ${value}`)
  }
}

const VALIDATORS = {
  stack: validateBooleanOpt,
  props: validateBooleanOpt,
  colors: validateBooleanOpt,
  icon: validateIcon,
  header: validateHeader,
}
