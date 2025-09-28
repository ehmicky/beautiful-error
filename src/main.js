import { inspect } from 'node:util'

import normalizeException from 'normalize-exception'

import { pickChildErrors, restoreChildErrors } from './child.js'
import { getTheme } from './colors.js'
import { getOpts } from './options/main.js'
import { prettifyError } from './pretty.js'
import { omitProps } from './props.js'
import {
  omitStack,
  omitStackBracket,
  PRINT_MAX_DEPTH,
  restoreStack,
} from './stack.js'

export { validateOptions } from './options/validate.js'

// Prettify error's message and stack
const beautifulError = (error, opts) => {
  const errorA = normalizeException(error)
  const {
    error: errorB,
    opts: { stack, props, colors, icon, header },
  } = getOpts(errorA, opts)
  const { theme, useColors } = getTheme(colors, header)
  return serializeFullError(errorB, { stack, props, theme, useColors, icon })
}

const serializeFullError = (error, opts) => {
  const { cause, errors } = pickChildErrors(error)
  const childErrorStrings = getChildErrorStrings({ cause, errors, opts })
  const errorString = serializeOneError(error, opts)
  restoreChildErrors(error, cause, errors)
  return [errorString, ...childErrorStrings].join('\n\n')
}

const getChildErrorStrings = ({ cause, errors = [], opts }) =>
  [cause, ...errors]
    .filter(Boolean)
    .map((error) => serializeFullError(error, opts))

const serializeOneError = (error, opts) => {
  const errorString = serializeError(error, opts)
  return prettifyError(error, errorString, opts)
}

// If `stack: false`, we do not print the error `stack` nor inline preview,
// which is useful for well-known errors such as input validation.
const serializeError = (error, { stack, props, useColors }) => {
  const errorA = omitProps(error, props)
  omitStack(errorA, stack)
  const errorString = inspect(errorA, {
    colors: useColors,
    depth: PRINT_MAX_DEPTH,
  })
  restoreStack(errorA, stack)
  return omitStackBracket(errorString, errorA.message)
}

export default beautifulError

console.log(beautifulError(new Error('oh')))
