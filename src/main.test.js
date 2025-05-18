import test from 'ava'
import prettyCliError, { validateOptions } from 'pretty-cli-error'
import { each } from 'test-each'

each(
  [
    { error: undefined, expectedMessage: 'Error: undefined' },
    { error: null, expectedMessage: 'Error: null' },
    { error: 'test', expectedMessage: 'Error: test' },
    { error: new TypeError('test'), expectedMessage: 'TypeError: test' },
  ],
  ({ title }, { error, expectedMessage }) => {
    test(`Normalize error | ${title}`, (t) => {
      const message = prettyCliError(error)
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
