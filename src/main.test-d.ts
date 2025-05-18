import { expectAssignable, expectNotAssignable, expectType } from 'tsd'

import prettyCliError, { validateOptions, type Options } from 'pretty-cli-error'

expectType<string>(prettyCliError(new Error('test')))
prettyCliError('error')
prettyCliError(undefined)

prettyCliError('', {})
expectAssignable<Options>({})
// @ts-expect-error
prettyCliError('', true)
expectNotAssignable<Options>(true)

prettyCliError('', { stack: true })
expectAssignable<Options>({ stack: true })
// @ts-expect-error
prettyCliError('', { stack: 'true' })
expectNotAssignable<Options>({ stack: 'true' })

prettyCliError('', { props: true })
expectAssignable<Options>({ props: true })
// @ts-expect-error
prettyCliError('', { props: 'true' })
expectNotAssignable<Options>({ props: 'true' })

prettyCliError('', { colors: true })
expectAssignable<Options>({ colors: true })
// @ts-expect-error
prettyCliError('', { colors: 'true' })
expectNotAssignable<Options>({ colors: 'true' })

prettyCliError('', { icon: '' })
expectAssignable<Options>({ icon: '' })
prettyCliError('', { icon: 'warning' })
expectAssignable<Options>({ icon: 'warning' })
// @ts-expect-error
prettyCliError('', { icon: 'warn' })
expectNotAssignable<Options>({ icon: 'warn' })
// @ts-expect-error
prettyCliError('', { icon: true })
expectNotAssignable<Options>({ icon: true })

prettyCliError('', { header: '' })
expectAssignable<Options>({ header: '' })
prettyCliError('', { header: 'red bold' })
expectAssignable<Options>({ header: 'red bold' })
// @ts-expect-error
prettyCliError('', { header: true })
expectNotAssignable<Options>({ header: true })
// @ts-expect-error
prettyCliError('', { header: 'unknown' })
expectNotAssignable<Options>({ header: 'unknown' })

expectType<void>(validateOptions({}))
validateOptions(0)
// @ts-expect-error
validateOptions()
