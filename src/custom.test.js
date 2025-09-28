import test from 'ava'

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
