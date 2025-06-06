import test from 'ava'
import { serialize } from 'error-serializer'
import { each } from 'test-each'

import beautifulError from 'beautiful-error'

const createDeepErrors = () => Array.from({ length: 5 }, createDeepError)

const createDeepError = (_, depth) => {
  const error = new TypeError('test')
  setDeepError(error, depth)
  return error
}

const setDeepError = (error, depth) => {
  if (depth === 0) {
    return
  }

  // eslint-disable-next-line fp/no-mutating-methods
  Object.defineProperty(error, 'cause', {
    value: new TypeError('test'),
    enumerable: false,
    writable: true,
    configurable: true,
  })
  // eslint-disable-next-line fp/no-delete
  delete error.stack
  setDeepError(error.cause, depth - 1)
}

const recursiveError = new TypeError('test')
// eslint-disable-next-line fp/no-mutation
recursiveError.self = recursiveError

const deepErrors = createDeepErrors()

const ownNameError = new Error('test')
// eslint-disable-next-line fp/no-mutation
ownNameError.name = 'TypeError'

const noStackError = new Error('test')
// eslint-disable-next-line fp/no-mutating-methods
Object.defineProperty(noStackError, 'stack', { value: noStackError.toString() })

const noMessageError = new Error('')

// eslint-disable-next-line fp/no-class
class WrongNameError extends Error {}
const wrongNameError = new WrongNameError('test')

each(
  [recursiveError, noStackError, noMessageError, wrongNameError, ...deepErrors],
  [true, false, undefined],
  [true, false, undefined],
  // eslint-disable-next-line max-params
  ({ title }, error, stack, props) => {
    test(`Prints stack unless "stack" is false | ${title}`, (t) => {
      const message = beautifulError(error, { stack, props })
      t.is(
        message.includes('at '),
        stack !== false && error.stack.includes('at '),
      )
    })

    test(`Does not put the error in brackets | ${title}`, (t) => {
      const message = beautifulError(error, { stack, props, icon: '' })
      t.false(message.startsWith('['))
    })

    test(`Does not modify the error | ${title}`, (t) => {
      const errorCopy = serialize(error)
      beautifulError(error, { stack, props })
      t.deepEqual(serialize(error), errorCopy)
    })

    test(`Prints error name and message | ${title}`, (t) => {
      const message = beautifulError(error, { stack, props })
      const expectedMessage = error.message === '' ? '' : `: ${error.message}`
      t.true(message.includes(`${error.name}${expectedMessage}`))
    })
  },
)

each([true, false], ({ title }, stack, props) => {
  test(`Prints error name consistently | ${title}`, (t) => {
    const message = beautifulError(ownNameError, { stack: false, props })
    t.true(message.includes(`Error [${ownNameError.name}`))
  })
})

test('Does not remove stacks from non-errors', (t) => {
  const error = new Error('test')
  error.prop = { stack: 'propStack' }
  const message = beautifulError(error, { stack: false, props: true })
  t.true(message.includes(error.prop.stack))
})
