import isPlainObj from 'is-plain-obj'

import { removeUndefined } from './default.js'

// `options.classes.{ErrorName}.*` is like `options.*` but only applies if
// `error.name` matches.
export const getClassesOpts = ({ classes = {}, ...opts }) => {
  validateObject(classes, "The option 'classes'")
  const { default: defaultClass = {}, ...classesA } = classes
  return { opts, classes: { ...classesA, default: defaultClass } }
}

export const applyClassesOpts = (name, classes, opts) => {
  const classesOpts = classes[name] ?? {}
  validateObject(classesOpts, `The option 'classes.${name}'`)
  return { ...opts, ...removeUndefined(classesOpts) }
}

export const validateObject = (value, optName) => {
  if (!isPlainObj(value)) {
    throw new Error(`${optName} must be a plain object, not: ${value}`)
  }
}

export const pickClassOpts = (classes, error) =>
  classes[error.name] ?? classes.default
