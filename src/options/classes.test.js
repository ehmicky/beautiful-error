import test from 'ava'
import figures from 'figures'

import beautifulError from 'beautiful-error'

test('Can set classes.* that matches', (t) => {
  const message = beautifulError(new TypeError('test'), {
    classes: { TypeError: { icon: 'warning' } },
  })
  t.true(message.includes(`${figures.warning} TypeError: test`))
})

test('Can set classes.* that does not match', (t) => {
  const message = beautifulError(new Error('test'), {
    classes: { TypeError: { icon: 'warning' } },
  })
  t.true(message.includes(`${figures.cross} Error: test`))
})
