import { validateHeader } from '../header.js'
import { validateIcon } from '../icon.js'

import { applyClassesOpts, getClassesOpts, validateObject } from './classes.js'
import { applyDefaultOpts } from './default.js'

// Validate option values.
// This is exported, although not documented.
export const validateOptions = (opts) => {
  normalizeOptions(opts)
}

export const normalizeOptions = (opts = {}) => {
  validateObject(opts, 'The options')
  const { classes, opts: optsA } = getClassesOpts(opts)
  return Object.fromEntries(
    Object.keys(classes).map((name) => [
      name,
      normalizeClassOptions(name, classes, optsA),
    ]),
  )
}

const normalizeClassOptions = (name, classes, opts) => {
  const classOpts = applyClassesOpts(name, classes, opts)
  Object.entries(classOpts).forEach(validateOpt)
  return applyDefaultOpts(classOpts)
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
  cause: validateBooleanOpt,
  props: validateBooleanOpt,
  colors: validateBooleanOpt,
  icon: validateIcon,
  header: validateHeader,
}
