import type { Styles } from 'chalk-string'
import type figures from 'figures'

/**
 * Validate `pretty-cli-error` options
 */
export function validateOptions(options: unknown): asserts options is Options

/**
 * `pretty-cli-error` options
 */
export interface Options {
  /**
   * Whether to log the `error` stack trace.
   *
   * @default true
   */
  readonly stack?: boolean

  /**
   * Whether to log the error's additional properties.
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

  /**
   * Specify different options per error class. The object:
   *  - Keys are either the
   *    [`error.name`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/name),
   *    or `"default"` (used if no `error.name` matches)
   *  - Values are options objects
   *
   * @default {}
   *
   * @example
   * ```js
   * prettyCliError(error, {
   *   InputError: { header: 'yellow', stack: false },
   *   DatabaseError: { header: 'blue', stack: false },
   *   default: { header: 'red' },
   * })
   * ```
   */
  readonly classes?: {
    readonly [errorName: string]: Omit<Options, 'classes'>
  }
}

/**
 * Logs `error` on the console (`stderr`) then exits the process.
 *
 * This never throws. Invalid `error`s are silently
 * [normalized](https://github.com/ehmicky/normalize-exception).
 *
 * @example
 * ```js
 * #!/usr/bin/env node
 * import prettyCliError from 'pretty-cli-error'
 *
 * const cliMain = () => {
 *   try {
 *     // ...
 *   } catch (error) {
 *     prettyCliError(error) // Logs `error` then exit the process
 *   }
 * }
 *
 * cliMain()
 * ```
 */
export default function prettyCliError(error: unknown, options?: Options): string
