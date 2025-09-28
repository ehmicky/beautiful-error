import { setNonEnumProp } from './utils.js'

export const pickChildErrors = (error) => {
  const { cause, errors } = error
  // eslint-disable-next-line fp/no-delete
  delete error.cause
  // eslint-disable-next-line fp/no-delete
  delete error.error
  return { cause, errors }
}

export const restoreChildErrors = (error, cause, errors) => {
  if (cause !== undefined) {
    setNonEnumProp(error, 'cause', cause)
  }

  if (error !== undefined) {
    setNonEnumProp(error, 'errors', errors)
  }
}
