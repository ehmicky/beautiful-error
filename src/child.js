import { setNonEnumProp } from './utils.js'

// Child errors (`cause` and `errors`) are printed on their own after their
// parent, with some indentation.
// They are temporarily removed so that they are not printed twice.
export const pickChildErrors = (error) => {
  const { cause, errors } = error
  // eslint-disable-next-line fp/no-delete
  delete error.cause
  // eslint-disable-next-line fp/no-delete
  delete error.errors
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
