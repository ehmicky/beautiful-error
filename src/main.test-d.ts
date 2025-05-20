import { expectAssignable, expectType } from 'tsd'

import prettyCliError, { type Options } from 'pretty-cli-error'

expectType<object>(prettyCliError(true))

prettyCliError(true, {})
expectAssignable<Options>({})
