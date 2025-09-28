import { inspect } from 'node:util'

import normalizeException from 'normalize-exception'

import { pickChildErrors, restoreChildErrors } from './child.js'
import { getTheme } from './colors.js'
import { callCustom } from './custom.js'
import { pickClassOpts } from './options/classes.js'
import { getOpts } from './options/main.js'
import { prettifyError } from './pretty.js'
import { omitProps } from './props.js'
import {
  omitStack,
  omitStackBracket,
  PRINT_MAX_DEPTH,
  restoreStack,
} from './stack.js'

// eslint-disable-next-line import/max-dependencies
export { validateOptions } from './options/validate.js'

// Prettify error's message and stack
const beautifulError = (error, opts) => {
  const errorA = normalizeException(error)
  const { error: errorB, classes } = getOpts(errorA, opts)
  return serializeFullError({ error: errorB, depth: 0, classes, opts })
}

const serializeFullError = ({ error, depth, classes, opts }) => {
  const classOpts = pickClassOpts(classes, error)
  const { cause, errors } = pickChildErrors(error)
  const childErrorStrings = getChildErrorStrings({
    cause,
    errors,
    classes,
    classOpts,
    opts,
    depth,
  })
  const errorString = serializeOneError({ error, depth, classOpts, opts })
  restoreChildErrors(error, cause, errors)
  return [errorString, ...childErrorStrings].join('\n')
}

const getChildErrorStrings = ({
  cause,
  errors = [],
  classes,
  classOpts,
  opts,
  depth,
}) =>
  classOpts.cause
    ? [cause, ...errors]
        .filter(Boolean)
        .map((error) =>
          serializeFullError({ error, depth: depth + 1, classes, opts }),
        )
    : []

const serializeOneError = ({
  error,
  depth,
  classOpts: { colors, header, stack, props, icon },
  opts,
}) => {
  const customReturn = callCustom(error, (cause) => beautifulError(cause, opts))

  if (typeof customReturn === 'string') {
    return customReturn
  }

  const { theme, useColors } = getTheme(colors, header)
  const errorString = serializeError({ error, stack, props, useColors })
  return prettifyError({ error, errorString, depth, theme, useColors, icon })
}

// If `stack: false`, we do not print the error `stack` nor inline preview,
// which is useful for well-known errors such as input validation.
const serializeError = ({ error, stack, props, useColors }) => {
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
