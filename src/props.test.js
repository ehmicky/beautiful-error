import test from 'ava'
import { each } from 'test-each'

import beautifulError from 'beautiful-error'

const propsError = new TypeError('test')
// eslint-disable-next-line fp/no-mutation
propsError.prop = 'propValue'

each(
  [true, false, undefined],
  [true, false, undefined],
  ({ title }, stack, props) => {
    test(`Prints properties unless "props" is false | ${title}`, (t) => {
      const message = beautifulError(propsError, { stack, props })
      t.is(message.includes(propsError.prop), props !== false)
    })
  },
)
