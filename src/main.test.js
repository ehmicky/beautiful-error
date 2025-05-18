import test from 'ava'
import { each } from 'test-each'

import beautifulError, { validateOptions } from 'beautiful-error'

each(
  [
    { error: undefined, expectedMessage: 'Error: undefined' },
    { error: null, expectedMessage: 'Error: null' },
    { error: 'test', expectedMessage: 'Error: test' },
    { error: new TypeError('test'), expectedMessage: 'TypeError: test' },
  ],
  ({ title }, { error, expectedMessage }) => {
    test(`Normalize error | ${title}`, (t) => {
      const message = beautifulError(error)
      t.true(message.includes(expectedMessage))
    })
  },
)

test('validateOpts() throws on invalid options', (t) => {
  t.throws(validateOptions.bind(undefined, { stack: 'true' }))
})

test('validateOpts() does not throw on valid options', (t) => {
  t.notThrows(validateOptions.bind(undefined, { stack: true }))
})
