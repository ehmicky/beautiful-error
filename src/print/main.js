import { inspect } from 'node:util'

import { getColors } from './colors.js'
import { prettifyError } from './pretty.js'
import { omitProps } from './props.js'
import {
  omitStack,
  omitStackBracket,
  PRINT_MAX_DEPTH,
  restoreStack,
} from './stack.js'

// Prettify the error.
// If `stack: false`, we do not print the error `stack` nor inline preview,
// which is useful for well-known errors such as input validation.
export const printError = ({
  error,
  stack,
  props,
  colors,
  icon,
  header,
}) => {
  const { addStyles, useColors } = getColors(colors)
  const errorString = serializeError({ error, stack, props, useColors })
  return prettifyError({
    error,
    errorString,
    addStyles,
    useColors,
    icon,
    header,
  })
}

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
