import prettyCliError, { validateOptions, type Options } from 'pretty-cli-error'
import { expectAssignable, expectNotAssignable, expectType } from 'tsd'

expectType<void>(prettyCliError(new Error('test')))
prettyCliError('error')
prettyCliError(undefined)

prettyCliError('', {})
expectAssignable<Options>({})
// @ts-expect-error
prettyCliError('', true)
expectNotAssignable<Options>(true)

prettyCliError('', { exitCode: 0 })
expectAssignable<Options>({ exitCode: 0 })
// @ts-expect-error
prettyCliError('', { exitCode: '0' })
expectNotAssignable<Options>({ exitCode: '0' })

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

prettyCliError('', { silent: true })
expectAssignable<Options>({ silent: true })
// @ts-expect-error
prettyCliError('', { silent: 'true' })
expectNotAssignable<Options>({ silent: 'true' })

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

prettyCliError('', { timeout: 0 })
expectAssignable<Options>({ timeout: 0 })
prettyCliError('', { timeout: 1e3 })
expectAssignable<Options>({ timeout: 1e3 })
prettyCliError('', { timeout: Number.POSITIVE_INFINITY })
expectAssignable<Options>({ timeout: Number.POSITIVE_INFINITY })
// @ts-expect-error
prettyCliError('', { timeout: '0' })
expectNotAssignable<Options>({ timeout: '0' })

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

prettyCliError('', { classes: { default: { exitCode: 0 } } })
expectAssignable<Options>({ classes: { default: { exitCode: 0 } } })
// @ts-expect-error
prettyCliError('', { classes: { default: { classes: {} } } })
expectNotAssignable<Options>({ classes: { default: { classes: {} } } })
expectNotAssignable<Options>({ classes: { default: undefined } })
expectNotAssignable<Options>({ classes: { Error: undefined } })
// @ts-expect-error
prettyCliError('', { classes: { default: { exitCode: '0' } } })
expectNotAssignable<Options>({ classes: { default: { exitCode: '0' } } })

expectType<void>(validateOptions({}))
validateOptions(0)
// @ts-expect-error
validateOptions()
