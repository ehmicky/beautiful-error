import test from 'ava'
import { each } from 'test-each'

import prettyCliError from 'pretty-cli-error'

const propsError = new TypeError('test')
// eslint-disable-next-line fp/no-mutation
propsError.prop = 'propValue'

each(
  [true, false, undefined],
  [true, false, undefined],
  ({ title }, stack, props) => {
    test(`Prints properties unless "props" is false | ${title}`, (t) => {
      const message = prettyCliError(propsError, { stack, props })
      t.is(message.includes(propsError.prop), props !== false)
    })
  },
)
