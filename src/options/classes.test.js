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

test('Can set classes.* that overrides', (t) => {
  const message = beautifulError(new TypeError('test'), {
    icon: 'info',
    classes: { TypeError: { icon: 'warning' } },
  })
  t.true(message.includes(`${figures.warning} TypeError: test`))
})

test('Can set classes.* undefined', (t) => {
  const message = beautifulError(new TypeError('test'), {
    icon: 'warning',
    classes: { TypeError: { icon: undefined } },
  })
  t.true(message.includes(`${figures.warning} TypeError: test`))
})

test('Can set classes.* empty', (t) => {
  const message = beautifulError(new TypeError('test'), {
    classes: { TypeError: {} },
  })
  t.true(message.includes(`${figures.cross} TypeError: test`))
})

test('Can set classes.default', (t) => {
  const message = beautifulError(new TypeError('test'), {
    classes: { default: { icon: 'warning' } },
  })
  t.true(message.includes(`${figures.warning} TypeError: test`))
})

test('Can set classes.default that overrides', (t) => {
  const message = beautifulError(new TypeError('test'), {
    icon: 'info',
    classes: { default: { icon: 'warning' } },
  })
  t.true(message.includes(`${figures.warning} TypeError: test`))
})

test('Can set classes.default that is overridden', (t) => {
  const message = beautifulError(new TypeError('test'), {
    classes: {
      default: { icon: 'info' },
      TypeError: { icon: 'warning' },
    },
  })
  t.true(message.includes(`${figures.warning} TypeError: test`))
})

test('Can set classes.default undefined', (t) => {
  const message = beautifulError(new TypeError('test'), {
    icon: 'warning',
    classes: { default: { icon: undefined } },
  })
  t.true(message.includes(`${figures.warning} TypeError: test`))
})

test('Can set classes.default empty', (t) => {
  const message = beautifulError(new TypeError('test'), {
    classes: { default: {} },
  })
  t.true(message.includes(`${figures.cross} TypeError: test`))
})

test('Can set classes.* in nested errors', (t) => {
  const message = beautifulError(
    new TypeError('test', { cause: new URIError('.cause') }),
    { classes: { TypeError: { icon: 'warning' }, URIError: { icon: 'info' } } },
  )
  t.true(message.includes(`${figures.warning} TypeError: test`))
  t.true(message.includes(`${figures.info} URIError: .child`))
})
