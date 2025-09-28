import isErrorInstance from 'is-error-instance'

import { setNonEnumProp } from './utils.js'

// If `stack` is `false`, we do not print stack traces.
// We do it by temporarily removing `error.stack` recursively.
// We prefer this over using some string replacement logic since this is less
// brittle.
export const omitStack = (error, stack) => {
  if (!stack) {
    recurseObject(error, omitStackProp)
  }
}

const omitStackProp = (object) => {
  if (
    !isErrorInstance(object) ||
    typeof object.stack !== 'string' ||
    object.stack === ''
  ) {
    return
  }

  setNonEnumProp(object, STACK_SYM, object.stack)
  // eslint-disable-next-line fp/no-delete, no-param-reassign
  delete object.stack
}

export const restoreStack = (error, stack) => {
  if (!stack) {
    recurseObject(error, restoreStackProp)
  }
}

const restoreStackProp = (object) => {
  if (object[STACK_SYM] === undefined) {
    return
  }

  setNonEnumProp(object, 'stack', object[STACK_SYM])
  // eslint-disable-next-line fp/no-delete, no-param-reassign
  delete object[STACK_SYM]
}

const STACK_SYM = Symbol('stack')

// Calls `callFunc(object)` on any object, recursively
const recurseObject = (value, callFunc) => {
  recurseValue(value, callFunc, 0)
}

const recurseValue = (value, callFunc, depth) => {
  if (
    typeof value !== 'object' ||
    value === null ||
    depth >= PRINT_MAX_DEPTH + 2
  ) {
    return
  }

  callFunc(value)

  Reflect.ownKeys(value).forEach((key) => {
    recurseValue(value[key], callFunc, depth + 1)
  })
}

// This is the default value, but we prevent overriding it with
// `inspect.defaultOptions`
export const PRINT_MAX_DEPTH = 2

// `util.inspect()` surround `error.name: error.message` with `[...]` when
// `error.stack` is missing. This is unwanted so we remove it.
// https://github.com/nodejs/node/blob/6f045771fa637d28eef115f4a91ea0c6076a177d/lib/internal/util/inspect.js#L1486
// This is done in some other cases (like when `error.stack` is odd looking)
// which we do not check since `error` has been normalized by
// `normalize-exception`.
// This is only removed for the top-level error since nested errors:
//  - Are less frequent
//  - Do not look as weird with `[...]`
//  - Would be harder to fix
export const omitStackBracket = (errorString, message) =>
  errorString.startsWith('[')
    ? errorString.slice(1).replace(`${message}]`, message)
    : errorString
