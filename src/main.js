import { inspect } from 'node:util'

import normalizeException from 'normalize-exception'

import { indentError, pickChildErrors, restoreChildErrors } from './child.js'
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
  const errorString = getErrorString(error, opts, classOpts)
  const mainErrorString = indentError(errorString, depth)
  restoreChildErrors(error, cause, errors)
  return [mainErrorString, ...childErrorStrings].join('\n')
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

const getErrorString = (
  error,
  opts,
  { colors, header, stack, props, icon, custom },
) => {
  const { theme, useColors } = getTheme(colors, header)
  const errorString = serializeError({ error, stack, props, useColors })
  const newErrorString = prettifyError({
    error,
    errorString,
    theme,
    useColors,
    icon,
  })
  return callCustom({
    error,
    errorString: newErrorString,
    custom,
    recursiveBeautiful: (cause) => beautifulError(cause, opts),
  })
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
