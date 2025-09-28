import { expectAssignable, expectNotAssignable, expectType } from 'tsd'

import beautifulError, { validateOptions, type Options } from 'beautiful-error'

expectType<string>(beautifulError(new Error('test')))
beautifulError('error')
beautifulError(undefined)

beautifulError('', {})
expectAssignable<Options>({})
// @ts-expect-error
beautifulError('', true)
expectNotAssignable<Options>(true)

beautifulError('', { stack: true })
expectAssignable<Options>({ stack: true })
// @ts-expect-error
beautifulError('', { stack: 'true' })
expectNotAssignable<Options>({ stack: 'true' })

beautifulError('', { cause: true })
expectAssignable<Options>({ cause: true })
// @ts-expect-error
beautifulError('', { cause: 'true' })
expectNotAssignable<Options>({ cause: 'true' })

beautifulError('', { props: true })
expectAssignable<Options>({ props: true })
// @ts-expect-error
beautifulError('', { props: 'true' })
expectNotAssignable<Options>({ props: 'true' })

beautifulError('', { colors: true })
expectAssignable<Options>({ colors: true })
// @ts-expect-error
beautifulError('', { colors: 'true' })
expectNotAssignable<Options>({ colors: 'true' })

beautifulError('', { icon: '' })
expectAssignable<Options>({ icon: '' })
beautifulError('', { icon: 'warning' })
expectAssignable<Options>({ icon: 'warning' })
// @ts-expect-error
beautifulError('', { icon: 'warn' })
expectNotAssignable<Options>({ icon: 'warn' })
// @ts-expect-error
beautifulError('', { icon: true })
expectNotAssignable<Options>({ icon: true })

beautifulError('', { header: '' })
expectAssignable<Options>({ header: '' })
beautifulError('', { header: 'red bold' })
expectAssignable<Options>({ header: 'red bold' })
// @ts-expect-error
beautifulError('', { header: true })
expectNotAssignable<Options>({ header: true })
// @ts-expect-error
beautifulError('', { header: 'unknown' })
expectNotAssignable<Options>({ header: 'unknown' })

beautifulError('', { classes: {} })
expectAssignable<Options>({ classes: {} })
// @ts-expect-error
beautifulError('', { classes: true })
expectNotAssignable<Options>({ classes: true })

beautifulError('', { classes: { Error: {} } })
expectAssignable<Options>({ classes: { Error: {} } })
beautifulError('', { classes: { TypeError: {} } })
expectAssignable<Options>({ classes: { TypeError: {} } })
beautifulError('', { classes: { default: {} } })
expectAssignable<Options>({ classes: { default: {} } })
beautifulError('', { classes: { error: {} } })
expectAssignable<Options>({ classes: { error: {} } })
beautifulError('', { classes: { other: {} } })
expectAssignable<Options>({ classes: { other: {} } })

beautifulError('', { classes: { default: { stack: false } } })
expectAssignable<Options>({ classes: { default: { stack: false } } })
// @ts-expect-error
beautifulError('', { classes: { default: { classes: {} } } })
expectNotAssignable<Options>({ classes: { default: { classes: {} } } })
expectNotAssignable<Options>({ classes: { default: undefined } })
expectNotAssignable<Options>({ classes: { Error: undefined } })
// @ts-expect-error
beautifulError('', { classes: { default: { stack: 0 } } })
expectNotAssignable<Options>({ classes: { default: { stack: 0 } } })

expectType<void>(validateOptions({}))
validateOptions(0)
// @ts-expect-error
validateOptions()
