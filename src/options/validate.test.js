import test from 'ava'
import { each } from 'test-each'

import beautifulError, { validateOptions } from 'beautiful-error'

const INVALID_USAGE = 'beautiful-error invalid usage'

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
  ],
  ({ title }, options) => {
    test(`Handle invalid options | ${title}`, (t) => {
      const message = beautifulError('', options)
      t.true(message.includes(INVALID_USAGE))
    })

    test(`Expose validateOptions() | ${title}`, (t) => {
      t.throws(validateOptions.bind(undefined, options))
    })
  },
)

each(
  [
    undefined,
    {},
    { stack: undefined },
    { props: undefined },
    { colors: undefined },
  ],
  ({ title }, options) => {
    test(`Allow undefined options | ${title}`, (t) => {
      t.notThrows(validateOptions.bind(undefined, options))

      const message = beautifulError('', options)
      t.false(message.includes(INVALID_USAGE))
    })
  },
)
