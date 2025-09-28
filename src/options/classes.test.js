import test from 'ava'
import figures from 'figures'

import beautifulError from 'beautiful-error'

// eslint-disable-next-line max-params
const checkMessage = (t, message, icon, name) => {
  t.true(message.includes(`${figures[icon]} ${name}: test`))
}

test('Can set classes.* that matches', (t) => {
  const message = beautifulError(new TypeError('test'), {
    classes: { TypeError: { icon: 'warning' } },
  })
  checkMessage(t, message, 'warning', 'TypeError')
})

test('Can set classes.* that does not match', (t) => {
  const message = beautifulError(new Error('test'), {
    classes: { TypeError: { icon: 'warning' } },
  })
  checkMessage(t, message, 'cross', 'Error')
})

test('Can set classes.* that overrides', (t) => {
  const message = beautifulError(new TypeError('test'), {
    icon: 'info',
    classes: { TypeError: { icon: 'warning' } },
  })
  checkMessage(t, message, 'warning', 'TypeError')
})

test('Can set classes.* undefined', (t) => {
  const message = beautifulError(new TypeError('test'), {
    icon: 'warning',
    classes: { TypeError: { icon: undefined } },
  })
  checkMessage(t, message, 'warning', 'TypeError')
})

test('Can set classes.* empty', (t) => {
  const message = beautifulError(new TypeError('test'), {
    classes: { TypeError: {} },
  })
  checkMessage(t, message, 'cross', 'TypeError')
})

test('Can set classes.default', (t) => {
  const message = beautifulError(new TypeError('test'), {
    classes: { default: { icon: 'warning' } },
  })
  checkMessage(t, message, 'warning', 'TypeError')
})

test('Can set classes.default that overrides', (t) => {
  const message = beautifulError(new TypeError('test'), {
    icon: 'info',
    classes: { default: { icon: 'warning' } },
  })
  checkMessage(t, message, 'warning', 'TypeError')
})

test('Can set classes.default that is overridden', (t) => {
  const message = beautifulError(new TypeError('test'), {
    classes: {
      default: { icon: 'info' },
      TypeError: { icon: 'warning' },
    },
  })
  checkMessage(t, message, 'warning', 'TypeError')
})

test('Can set classes.default undefined', (t) => {
  const message = beautifulError(new TypeError('test'), {
    icon: 'warning',
    classes: { default: { icon: undefined } },
  })
  checkMessage(t, message, 'warning', 'TypeError')
})

test('Can set classes.default empty', (t) => {
  const message = beautifulError(new TypeError('test'), {
    classes: { default: {} },
  })
  checkMessage(t, message, 'cross', 'TypeError')
})

test('Can set classes.* in nested errors', (t) => {
  const message = beautifulError(
    new TypeError('test', { cause: new URIError('test') }),
    { classes: { TypeError: { icon: 'warning' }, URIError: { icon: 'info' } } },
  )
  checkMessage(t, message, 'warning', 'TypeError')
  checkMessage(t, message, 'info', 'URIError')
})
