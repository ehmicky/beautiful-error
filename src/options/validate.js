import isPlainObj from 'is-plain-obj'

import { validateHeader } from '../header.js'
import { validateIcon } from '../icon.js'

import { validateClasses } from './classes.js'
import { handleInvalidOpts } from './invalid.js'

// Validate option values.
// This is exported, although not documented.
export const validateOptions = (opts) => {
  validateAllOpts(opts, [])
}

const validateAllOpts = (opts, optName) => {
  if (opts === undefined) {
    return
  }

  if (!isPlainObj(opts)) {
    handleInvalidOpts('must be a plain object', opts, optName)
  }

  Object.entries(opts).forEach(([key, optValue]) => {
    validateOpt(optValue, [...optName, key])
  })
}

const validateOpt = (optValue, optName) => {
  if (optValue === undefined) {
    return
  }

  const validator = VALIDATORS[optName.at(-1)]

  if (validator === undefined) {
    handleInvalidOpts('is an unknown option', '', optName)
  }

  validator(optValue, optName, validateAllOpts)
}

const validateBooleanOpt = (value, optName) => {
  if (typeof value !== 'boolean') {
    handleInvalidOpts('must be a boolean', value, optName)
  }
}

const VALIDATORS = {
  stack: validateBooleanOpt,
  props: validateBooleanOpt,
  colors: validateBooleanOpt,
  icon: validateIcon,
  header: validateHeader,
  classes: validateClasses,
}
