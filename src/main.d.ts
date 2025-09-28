import type { Styles } from 'chalk-string'
import type figures from 'figures'

/**
 * Validate `beautiful-error` options
 */
export function validateOptions(options: unknown): asserts options is Options

/**
 * `beautiful-error` options
 */
export interface Options {
  /**
   * Whether to show the `error` stack trace.
   *
   * @default true
   */
  readonly stack?: boolean

  /**
   * Whether to show nested errors, i.e.
   * [`error.cause`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause)
   * and
   * [`error.errors`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError/errors).
   *
   * @default true
   */
  readonly cause?: boolean

  /**
   * Whether to show the error's additional properties.
   *
   * @default true
   */
  readonly props?: boolean

  /**
   * Whether to colorize the error's message, stack trace and additional properties.
   *
   * Quoted strings in the error's message are printed in bold (for `"..."` and
   * `'...'`) and in italic (for `` `...` ``).
   *
   * @default `true` in terminals, `false` otherwise
   */
  readonly colors?: boolean

  /**
   * Icon prepended to the error's name. The available values are listed
   * [here](https://github.com/sindresorhus/figures/blob/main/readme.md#figures-1).
   * Can be disabled by passing an empty string.
   *
   * @default 'cross'
   */
  readonly icon?: keyof typeof figures | ''

  /**
   * Color/style of the error's icon and name. The available values are listed
   * [here](https://github.com/ehmicky/chalk-string#available-styles).
   * Several styles can be specified by using spaces.
   * Can be disabled by passing an empty string.
   *
   * @default 'red bold'
   */
  readonly header?: Styles | ''
}

/**
 * Returns `error` as a prettified string.
 *
 * This never throws. Invalid `error`s are silently
 * [normalized](https://github.com/ehmicky/normalize-exception).
 *
 * @example
 * ```js
 * import beautifulError from 'beautiful-error'
 *
 * try {
 *   // ...
 * } catch (error) {
 *   const message = beautifulError(error)
 *   console.error(message)
 * }
 * ```
 */
export default function beautifulError(
  error: unknown,
  options?: Options,
): string
