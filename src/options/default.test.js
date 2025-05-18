import test from 'ava'
import figures from 'figures'
import prettyCliError from 'pretty-cli-error'
import { each } from 'test-each'

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
