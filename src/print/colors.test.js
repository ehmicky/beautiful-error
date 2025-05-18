import test from 'ava'
import chalkString from 'chalk-string'
import hasAnsi from 'has-ansi'
import prettyCliError from 'pretty-cli-error'
import { each } from 'test-each'

const testError = new TypeError('test')
const addStyles = chalkString({ colors: true })

each([true, false], ({ title }, colors) => {
  test(`Add colors unless "colors" is false | ${title}`, (t) => {
    const message = prettyCliError(testError, { colors })
    t.is(hasAnsi(message), colors !== false)
  })
})

test('"colors" defaults to TTY color support', (t) => {
  const message = prettyCliError(testError)
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
      const message = prettyCliError(error, { colors: true })
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
