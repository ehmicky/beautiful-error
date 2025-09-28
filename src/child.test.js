import test from 'ava'
import figures from 'figures'

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

test('Child errors are indented', (t) => {
  const message = beautifulError(nestedCauseError)
  const lines = message.split('\n')

  const topLine = lines.find((line) => line.includes('TypeError: test'))
  t.false(topLine.startsWith(' '))

  const secondLine = lines.find((line) => line.includes('RangeError: .cause'))
  t.true(secondLine.startsWith(' '.repeat(INDENT_SIZE)))
  t.false(secondLine.startsWith(' '.repeat(INDENT_SIZE + 1)))

  const thirdLine = lines.find((line) =>
    line.includes('URIError: .cause.cause'),
  )
  t.true(thirdLine.startsWith(' '.repeat(INDENT_SIZE * 2)))
  t.false(thirdLine.startsWith(' '.repeat(INDENT_SIZE * 2 + 1)))
})

const INDENT_SIZE = 4

test('Child errors are prettified', (t) => {
  const message = beautifulError(causeError)
  t.true(message.includes(`${figures.cross} RangeError: .cause`))
})

test('Cause is omitted if the "cause" option is false', (t) => {
  const message = beautifulError(causeError, { cause: false })
  t.true(message.includes('TypeError: test'))
  t.false(message.includes('RangeError: .cause'))
  t.false(message.includes('[cause]'))
})

test('Aggregate errors are omitted if the "cause" option is false', (t) => {
  const message = beautifulError(aggregateError, { cause: false })
  t.true(message.includes('AggregateError: test'))
  t.false(message.includes('TypeError: .errors'))
  t.false(message.includes('[errors]'))
})
