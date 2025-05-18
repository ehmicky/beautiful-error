import { inspect } from 'node:util'

import normalizeException from 'normalize-exception'

import { getColors } from './colors.js'
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

  const { addStyles, useColors } = getColors(colors)
  const errorString = serializeError({ error: errorB, stack, props, useColors })
  return prettifyError({
    error: errorB,
    errorString,
    addStyles,
    useColors,
    icon,
    header,
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
  return omitStackBracket(errorString)
}

export default beautifulError
