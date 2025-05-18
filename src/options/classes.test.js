import test from 'ava'
import figures from 'figures'
import { each } from 'test-each'

import prettyCliError from 'pretty-cli-error'

each(
  [
    { classes: { TypeError: { icon: 'warning' } } },
    { icon: 'warning', classes: { Error: { icon: 'info' } } },
    { classes: { Error: { icon: 'info' }, default: { icon: 'warning' } } },
    { classes: { TypeError: { icon: 'warning' }, default: { icon: 'info' } } },
    { icon: 'info', classes: { default: { icon: 'warning' } } },
    { icon: 'warning', classes: { typeerror: { icon: 'info' } } },
  ],
  ({ title }, options) => {
    test(`Apply option "classes" | ${title}`, (t) => {
      const typeError = new TypeError('test')
      const message = prettyCliError(typeError, options)
      t.true(message.includes(figures.warning))
    })
  },
)
