import prettyCliError, { validateOptions, type Options } from 'pretty-cli-error'
import { expectAssignable, expectNotAssignable, expectType } from 'tsd'

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

prettyCliError('', { classes: {} })
expectAssignable<Options>({ classes: {} })
// @ts-expect-error
prettyCliError('', { classes: true })
expectNotAssignable<Options>({ classes: true })

prettyCliError('', { classes: { Error: {} } })
expectAssignable<Options>({ classes: { Error: {} } })
prettyCliError('', { classes: { TypeError: {} } })
expectAssignable<Options>({ classes: { TypeError: {} } })
prettyCliError('', { classes: { default: {} } })
expectAssignable<Options>({ classes: { default: {} } })
prettyCliError('', { classes: { error: {} } })
expectAssignable<Options>({ classes: { error: {} } })
prettyCliError('', { classes: { other: {} } })
expectAssignable<Options>({ classes: { other: {} } })

prettyCliError('', { classes: { default: { icon: 'warning' } } })
expectAssignable<Options>({ classes: { default: { icon: 'warning' } } })
// @ts-expect-error
prettyCliError('', { classes: { default: { classes: {} } } })
expectNotAssignable<Options>({ classes: { default: { classes: {} } } })
expectNotAssignable<Options>({ classes: { default: undefined } })
expectNotAssignable<Options>({ classes: { Error: undefined } })
// @ts-expect-error
prettyCliError('', { classes: { default: { icon: true } } })
expectNotAssignable<Options>({ classes: { default: { icon: true } } })

expectType<void>(validateOptions({}))
validateOptions(0)
// @ts-expect-error
validateOptions()
