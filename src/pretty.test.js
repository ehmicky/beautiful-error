import test from 'ava'
import chalkString from 'chalk-string'
import { each } from 'test-each'

import beautifulError from 'beautiful-error'

const addStyles = (styles, string) =>
  chalkString(styles, { colors: true })(string)

test('"colors" does not colorize quoted strings in stack line', (t) => {
  const error = new Error('test')
  const stackLines = '    at "a"'
  error.stack = `Error: test\n${stackLines}`
  const message = beautifulError(error, { colors: true })
  t.true(message.endsWith(stackLines))
})

each(['Error: ', 'Error [TypeError]: '], ({ title }, name) => {
  test(`"colors" does not colorize quoted strings in preview lines | ${title}`, (t) => {
    const error = new Error('test "b"')
    const previewLines = '"a"'
    error.stack = `${previewLines}\n${name}${error.stack}`
    const message = beautifulError(error, { colors: true })
    t.true(message.startsWith(previewLines))
    t.true(message.includes(`"${addStyles('bold', 'b')}"`))
  })
})

test('"colors" does not colorize quoted strings without preview nor lines', (t) => {
  const error = new Error('test')
  error.stack = '"a"'
  const message = beautifulError(error, { colors: true })
  t.true(message.includes(`"${addStyles('bold', 'a')}"`))
})
