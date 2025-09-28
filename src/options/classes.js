import isPlainObj from 'is-plain-obj'

import { removeUndefined } from './default.js'

// `options.classes.{ErrorName}.*` is like `options.*` but only applies if
// `error.name` matches.
export const getClassesOpts = ({ classes = {}, ...opts }) => {
  validateObject(classes, 'classes')
  const names =
    Object.keys(classes).length === 0 ? ['default'] : Object.keys(classes)
  return { names, classes, opts }
}

export const applyClassesOpts = (name, classes, opts) => {
  const classesOpts = classes[name] || classes.default || {}
  validateObject(classesOpts, `classes.${name}`)
  return { ...opts, ...removeUndefined(classesOpts) }
}

export const validateObject = (value, optName) => {
  if (!isPlainObj(value)) {
    throw new Error(`"${optName}" must be a plain object: ${value}`)
  }
}
