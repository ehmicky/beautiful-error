import test from 'ava'
import figures from 'figures'

import beautifulError from 'beautiful-error'

// eslint-disable-next-line fp/no-class
class TestError extends Error {
  // eslint-disable-next-line class-methods-use-this
  beautiful(errorString) {
    return errorString.toUpperCase()
  }
}

test('Can define error.beautiful()', (t) => {
  const message = beautifulError(new TestError('test'))
  t.true(message.includes('TEST'))
})

test('Can define error.beautiful that is not a function', (t) => {
  const error = new Error('test')
  error.beautiful = true
  const message = beautifulError(error)
  t.true(message.includes(`${figures.cross} Error: test`))
})

test('error.beautiful() invalid return value is handled', (t) => {
  const error = new Error('test')
  error.beautiful = () => {}
  const message = beautifulError(error)
  t.true(
    message.includes(
      `${figures.cross} TypeError: 'error.beautiful()' must return a string, not: undefined`,
    ),
  )
})

test('error.beautiful() non-serializable return value is handled', (t) => {
  const error = new Error('test')
  error.beautiful = () => ({
    toString() {
      throw new TypeError('inner')
    },
  })
  const message = beautifulError(error)
  t.true(
    message.includes(
      `${figures.cross} TypeError: 'error.beautiful()' must return a string, not: TypeError: inner`,
    ),
  )
})

test('error.beautiful() exception is handled', (t) => {
  const error = new Error('test')

  error.beautiful = () => {
    throw new TypeError('inner')
  }

  const message = beautifulError(error)
  t.true(message.includes(`${figures.cross} TypeError: inner`))
})

test('error.beautiful() non-error exception is handled', (t) => {
  const error = new Error('test')

  error.beautiful = () => {
    // eslint-disable-next-line no-throw-literal
    throw undefined
  }

  const message = beautifulError(error)
  t.true(message.includes(`${figures.cross} Error: undefined`))
})

test('error.beautiful() exception does not infinitely recurse', (t) => {
  // eslint-disable-next-line fp/no-class
  class RecursiveError extends Error {
    // eslint-disable-next-line class-methods-use-this
    beautiful() {
      throw new RecursiveError('inner')
    }
  }

  const message = beautifulError(new RecursiveError('test'))
  t.true(message.includes(`${figures.cross} RecursiveError: inner`))
})
