import test from 'ava'
import { each } from 'test-each'

import prettyCliError, { validateOptions } from 'pretty-cli-error'

const INVALID_USAGE = 'pretty-cli-error invalid usage'

each(
  [
    true,
    { stack: 0 },
    { props: 0 },
    { colors: 0 },
    { icon: 'unknown' },
    { header: 0 },
    { header: 'red-0' },
    { header: 'unknown' },
    { unknown: true },
    { classes: true },
    { classes: { default: true } },
    { classes: { default: { classes: {} } } },
  ],
  ({ title }, options) => {
    test(`Handle invalid options | ${title}`, (t) => {
      const message = prettyCliError('', options)
      t.true(message.includes(INVALID_USAGE))
    })

    test(`Expose validateOptions() | ${title}`, (t) => {
      t.throws(validateOptions.bind(undefined, options))
    })
  },
)

each(
  [
    ...['stack', 'props', 'colors'].flatMap((optName) => [
      { [optName]: undefined },
      { classes: { default: { [optName]: undefined } } },
    ]),
    ...[undefined, {}].flatMap((value) => [
      value,
      { classes: value },
      { classes: { default: value } },
    ]),
  ],
  ({ title }, options) => {
    test(`Allow undefined options | ${title}`, (t) => {
      t.notThrows(validateOptions.bind(undefined, options))

      const message = prettyCliError('', options)
      t.false(message.includes(INVALID_USAGE))
    })
  },
)
