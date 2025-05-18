import figures from 'figures'

// Validate `icon` option
export const validateIcon = (value, optName) => {
  if (value !== '' && figures[value] === undefined) {
    throw new Error(
      `"${optName}" must be an icon name like "cross", "info" or "warning": ${value}`,
    )
  }
}

// Adds `icon` option before the error name
export const addIcon = (messageLines, icon) => {
  if (icon === '') {
    return messageLines
  }

  const [firstMessageLine, ...messageLinesA] = messageLines
  return [`${figures[icon]} ${firstMessageLine}`, ...messageLinesA]
}
