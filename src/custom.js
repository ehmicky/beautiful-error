import isErrorInstance from 'is-error-instance'

// `error.beautiful()` can be define to customize behavior
export const callCustom = (error, errorString, recursiveBeautiful) => {
  if (typeof error.beautiful !== 'function' || CUSTOM_MAP.has(error)) {
    return errorString
  }

  const newErrorString = callBeautifulMethod(
    error,
    errorString,
    recursiveBeautiful,
  )
  return validateReturnValue(newErrorString, recursiveBeautiful)
}

const callBeautifulMethod = (error, errorString, recursiveBeautiful) => {
  CUSTOM_MAP.add(error)

  try {
    return error.beautiful(errorString)
  } catch (cause) {
    return serializeError(cause, recursiveBeautiful)
  } finally {
    CUSTOM_MAP.delete(error)
  }
}

// `error.beautiful()` could throw a new error each time it is called, creating
// an infinite recursion.
// So we prevent `.beautiful()` to be called recursively here.
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

const validateReturnValue = (errorString, recursiveBeautiful) => {
  if (typeof errorString === 'string') {
    return errorString
  }

  const error = new TypeError(
    `'error.beautiful()' must return a string, not: ${safeString(errorString)}`,
  )
  return recursiveBeautiful(error)
}

const safeString = (value) => {
  try {
    return String(value)
  } catch (error) {
    return safeString(error)
  }
}
