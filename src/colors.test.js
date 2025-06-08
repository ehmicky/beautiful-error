import test from 'ava'
import chalkString from 'chalk-string'
import hasAnsi from 'has-ansi'
import { each } from 'test-each'

import beautifulError from 'beautiful-error'

const testError = new TypeError('test')
const addStyles = (styles, string) =>
  chalkString(styles, { colors: true })(string)

each([true, false], ({ title }, colors) => {
  test(`Add colors unless "colors" is false | ${title}`, (t) => {
    const message = beautifulError(testError, { colors })
    t.is(hasAnsi(message), colors !== false)
  })
})

test('"colors" defaults to TTY color support', (t) => {
  const message = beautifulError(testError)
  t.false(hasAnsi(message))
})

each(
  [
    { quote: '"', styles: 'bold' },
    { quote: "'", styles: 'bold' },
    { quote: '`', styles: 'italic' },
  ],
  [true, false],
  ({ title }, { quote, styles }, hasNewline) => {
    test(`"colors" colorize quoted strings | ${title}`, (t) => {
      const newline = hasNewline ? '\n' : ''
      const error = new Error(
        `a ${quote}b${newline}${quote} c ${quote}d${quote}`,
      )
      const message = beautifulError(error, { colors: true })
      t.not(
        message.includes(
          `a ${quote}${addStyles(
            styles,
            'b',
          )}${newline}${quote} c ${quote}${addStyles(styles, 'd')}${quote}`,
        ),
        hasNewline,
      )
    })
  },
)
