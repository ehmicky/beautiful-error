import isErrorInstance from 'is-error-instance'

export const callCustom = (error, recursiveBeautiful) => {
  if (typeof error.beautiful !== 'function' || CUSTOM_MAP.has(error)) {
    return
  }

  const errorString = callBeautifulMethod(error, recursiveBeautiful)

  if (typeof errorString === 'string') {
    return errorString
  }

  const typeError = new TypeError(
    `'error.beautiful()' must return a string, not: ${safeString(errorString)}`,
  )
  return recursiveBeautiful(typeError)
}

const callBeautifulMethod = (error, recursiveBeautiful) => {
  CUSTOM_MAP.add(error)

  try {
    return error.beautiful()
  } catch (cause) {
    return serializeError(cause, recursiveBeautiful)
  } finally {
    CUSTOM_MAP.delete(error)
  }
}

const safeString = (value) => {
  try {
    return String(value)
  } catch (error) {
    return String(error)
  }
}

const serializeError = (error, recursiveBeautiful) => {
  if (!isErrorInstance(error)) {
    return recursiveBeautiful(error)
  }

  CUSTOM_MAP.add(error)

  try {
    return recursiveBeautiful(error)
  } finally {
    CUSTOM_MAP.delete(error)
  }
}

const CUSTOM_MAP = new WeakSet()
