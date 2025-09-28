# 2.1.0

## Features

- The output can be customized by defining an
  [`error.beautiful(output)`](README.md#-custom) method returning a string.

# 2.0.0

## Breaking changes

- Previously, if the [`props`](README.md#-props) option was `false`, nested
  errors
  ([`error.cause`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause)
  and
  [`error.errors`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError/errors))
  were not printed. To achieve the same behavior, the
  [`cause`](README.md#-cause) option must now be set to `false`.

## Features

- Nested errors are now printed on their own, which result in a prettier output.
- Add the [`classes`](README.md#-classes) option to set error class-specific
  options.

# 1.1.0

## Dependencies

- Upgrade dependency [`chalk-string`](https://github.com/ehmicky/chalk-string)

# 1.0.2

## Bug fixes

- Fix issues printing errors that include `]` in their message, when the
  [`stack`](README.md#-stack) option is `false`.

# 1.0.1

## Chores

- Reduce code size.

# 1.0.0

Initial release.
