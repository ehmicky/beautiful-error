import test from 'ava'
import figures from 'figures'
import { each } from 'test-each'

import prettyCliError from 'pretty-cli-error'

each(
  [
    { icon: '', output: '' },
    { icon: undefined, output: `${figures.cross} ` },
    { icon: 'warning', output: `${figures.warning} ` },
  ],
  ({ title }, { icon, output }) => {
    test(`"icon" prepends an icon | ${title}`, (t) => {
      const error = new Error('test')
      const message = prettyCliError(error, { icon })
      t.true(message.includes(`${output}${error.name}`))
    })
  },
)

test('"icon" is not added to preview lines', (t) => {
  const error = new Error('test')
  error.stack = `preview\n${error.stack}`
  const message = prettyCliError(error, { icon: 'warning' })
  t.true(message.includes(`${figures.warning} ${error.name}`))
})
