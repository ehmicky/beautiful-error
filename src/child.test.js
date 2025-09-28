import test from 'ava'

import beautifulError from 'beautiful-error'

const causeError = new TypeError('test', { cause: new RangeError('.cause') })
const aggregateError = new AggregateError([new TypeError('.errors')], 'test')
const nestedCauseError = new TypeError('test', {
  cause: new RangeError('.cause', { cause: new URIError('.cause.cause') }),
})
const nestedAggregateError = new AggregateError(
  [new AggregateError([new TypeError('.errors.errors')], '.errors')],
  'test',
)

test('Cause is serialized by default', (t) => {
  const message = beautifulError(causeError)
  t.true(message.includes('TypeError: test'))
  t.true(message.includes('RangeError: .cause'))
  t.false(message.includes('[cause]'))
})

test('Nested cause is serialized by default', (t) => {
  const message = beautifulError(nestedCauseError)
  t.true(message.includes('TypeError: test'))
  t.true(message.includes('RangeError: .cause'))
  t.true(message.includes('URIError: .cause.cause'))
  t.false(message.includes('[cause]'))
})

test('Aggregate errors are serialized by default', (t) => {
  const message = beautifulError(aggregateError)
  t.true(message.includes('AggregateError: test'))
  t.true(message.includes('TypeError: .errors'))
  t.false(message.includes('[errors]'))
})

test('Nested aggregate errors are serialized by default', (t) => {
  const message = beautifulError(nestedAggregateError)
  t.true(message.includes('AggregateError: test'))
  t.true(message.includes('AggregateError: .errors'))
  t.true(message.includes('TypeError: .errors.errors'))
  t.false(message.includes('[errors]'))
})

test('Cause is restored', (t) => {
  const descriptor = Object.getOwnPropertyDescriptor(causeError, 'cause')
  beautifulError(causeError)
  t.deepEqual(Object.getOwnPropertyDescriptor(causeError, 'cause'), descriptor)
})

test('Aggregate errors are restored', (t) => {
  const descriptor = Object.getOwnPropertyDescriptor(aggregateError, 'errors')
  beautifulError(aggregateError)
  t.deepEqual(
    Object.getOwnPropertyDescriptor(aggregateError, 'errors'),
    descriptor,
  )
})
