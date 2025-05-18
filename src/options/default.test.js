import test from 'ava'
import figures from 'figures'
import { each } from 'test-each'

import prettyCliError from 'pretty-cli-error'

each(
  [
    { options: { icon: undefined }, expectedIcon: 'cross' },
    {
      options: { icon: 'warning', classes: { default: { icon: undefined } } },
      expectedIcon: 'warning',
    },
  ],
  ({ title }, { options, expectedIcon }) => {
    test(`Undefined options are ignored | ${title}`, (t) => {
      const message = prettyCliError('', options)
      t.true(message.includes(figures[expectedIcon]))
    })
  },
)
