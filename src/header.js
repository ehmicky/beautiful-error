import chalkString from 'chalk-string'

// Validate `header` option
export const validateHeader = (value, optName) => {
  if (typeof value !== 'string') {
    throw new TypeError(`"${optName}" must be a string: ${value}`)
  }

  if (value === '') {
    return
  }

  try {
    chalkString(value)
  } catch (error) {
    throw new Error(
      `"${optName}" ${value} must be a valid style: ${error.message}`,
    )
  }
}

// Apply `header` option to colorize the error's icon and name
export const applyHeader = ({ messageLines, useColors, theme, error }) => {
  if (theme.header === undefined || !useColors) {
    return messageLines
  }

  const [firstMessageLine, ...messageLinesA] = messageLines
  const firstMessageLineA = applyHeaderLine(firstMessageLine, theme, error)
  return [firstMessageLineA, ...messageLinesA]
}

const applyHeaderLine = (firstMessageLine, theme, error) => {
  const endIndex = getEndIndex(firstMessageLine, error)

  if (endIndex === -1) {
    return firstMessageLine
  }

  const start = firstMessageLine.slice(0, endIndex)
  const end = firstMessageLine.slice(endIndex)
  return `${theme.header(start)}${end}`
}

const getEndIndex = (firstMessageLine, error) => {
  const endIndex = firstMessageLine.indexOf(':')

  if (endIndex !== -1) {
    return endIndex + 1
  }

  return firstMessageLine.endsWith(error.name)
    ? firstMessageLine.length
    : endIndex
}
