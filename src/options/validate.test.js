import test from 'ava'
import { each } from 'test-each'

import beautifulError, { validateOptions } from 'beautiful-error'

const INVALID_USAGE = 'beautiful-error invalid usage'

each(
  [
    true,
    { stack: 0 },
    { classes: { TypeError: { stack: 0 } } },
    { cause: 0 },
    { classes: { TypeError: { cause: 0 } } },
    { props: 0 },
    { classes: { TypeError: { props: 0 } } },
    { colors: 0 },
    { classes: { TypeError: { colors: 0 } } },
    { icon: 'unknown' },
    { classes: { TypeError: { icon: 'unknown' } } },
    { header: 0 },
    { classes: { TypeError: { header: 0 } } },
    { header: 'red-0' },
    { classes: { TypeError: { header: 'red-0' } } },
    { header: 'unknown' },
    { classes: { TypeError: { header: 'unknown' } } },
    { classes: 0 },
    { classes: { TypeError: 0 } },
    { classes: { TypeError: { classes: {} } } },
    { unknown: true },
    { classes: { TypeError: { unknown: true } } },
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
    { cause: undefined },
    { props: undefined },
    { colors: undefined },
    { icon: undefined },
    { header: undefined },
    { classes: undefined },
    { classes: { TypeError: undefined } },
  ],
  ({ title }, options) => {
    test(`Allow undefined options | ${title}`, (t) => {
      t.notThrows(validateOptions.bind(undefined, options))

      const message = beautifulError('', options)
      t.false(message.includes(INVALID_USAGE))
    })
  },
)
