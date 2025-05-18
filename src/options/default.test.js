import test from 'ava'
import figures from 'figures'

import prettyCliError from 'pretty-cli-error'

test('Undefined options are ignored', (t) => {
  const message = prettyCliError('', { icon: undefined })
  t.true(message.includes(figures.cross))
})
