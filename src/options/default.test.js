import test from 'ava'
import figures from 'figures'

import beautifulError from 'beautiful-error'

test('Undefined options are ignored', (t) => {
  const message = beautifulError('', { icon: undefined })
  t.true(message.includes(figures.cross))
})
