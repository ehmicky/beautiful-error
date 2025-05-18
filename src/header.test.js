import test from 'ava'
import chalkString from 'chalk-string'
import figures from 'figures'
import { each } from 'test-each'

import beautifulError from 'beautiful-error'

const addStyles = chalkString({ colors: true })
const testOpts = { icon: '', colors: true }

each(
  [
    { header: undefined, styles: 'red bold' },
    { header: 'bold', styles: 'bold' },
    { header: 'red bold', styles: 'red bold' },
  ],
  ({ title }, { header, styles }) => {
    test(`"header" is applied | ${title}`, (t) => {
      const error = new Error('test')
      const message = beautifulError(error, { ...testOpts, header })
      t.true(message.includes(addStyles(styles, `${error.name}:`)))
      t.pass()
    })
  },
)

each([{ colors: false }, { header: '' }], ({ title }, opts) => {
  test(`"header" is not applied if empty or no colors | ${title}`, (t) => {
    const error = new Error('test')
    const message = beautifulError(error, { ...testOpts, ...opts })
    t.true(message.includes(`${error.name}: `))
    t.pass()
  })
})

test('"header" is not added to preview lines', (t) => {
  const error = new Error('test')
  const preview = 'preview'
  error.stack = `${preview}\n${error.stack}`
  const message = beautifulError(error, testOpts)
  t.true(message.startsWith(preview))
})

test('"header" works with empty messages', (t) => {
  const error = new Error('')
  const header = 'green'
  const message = beautifulError(error, { ...testOpts, header })
  t.true(message.includes(addStyles(header, error.name)))
})

test('"header" colorizes the icon', (t) => {
  const error = new Error('test')
  const header = 'green'
  const message = beautifulError(error, {
    ...testOpts,
    icon: 'warning',
    header,
  })
  t.true(
    message.includes(addStyles(header, `${figures.warning} ${error.name}:`)),
  )
})
