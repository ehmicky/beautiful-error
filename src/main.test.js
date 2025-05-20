import test from 'ava'

import prettyCliError from 'pretty-cli-error'

test('Dummy test', (t) => {
  t.true(prettyCliError(true))
})
