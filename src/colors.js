import { stderr } from 'node:process'

import chalkString from 'chalk-string'

// Compute the `colors` option, which defaults to `true` if the output supports
// colors.
export const getTheme = (colors, header) => {
  const theme = {
    bold: getThemeColor('bold', colors),
    italic: getThemeColor('italic', colors),
    header: header === '' ? undefined : getThemeColor(header, colors),
  }
  const useColors = theme.bold('_') !== '_'
  return { theme, useColors }
}

const getThemeColor = (style, colors) =>
  chalkString(style, { colors, stream: stderr })

// When `colors` is true, add colors to quoted strings.
// `util.inspect()` strips ANSI sequences, so this must be done on the
// serialized output.
export const colorizeLine = (line, useColors, { bold, italic }) => {
  if (!useColors) {
    return line
  }

  return line
    .replaceAll(
      DOUBLE_QUOTED_STRING,
      colorizeQuotedString.bind(undefined, bold),
    )
    .replaceAll(
      SINGLE_QUOTED_STRING,
      colorizeQuotedString.bind(undefined, bold),
    )
    .replaceAll(
      BACKTICK_QUOTED_STRING,
      colorizeQuotedString.bind(undefined, italic),
    )
}

const DOUBLE_QUOTED_STRING = /(")([^"]+)(")/gu
const SINGLE_QUOTED_STRING = /(')([^']+)(')/gu
const BACKTICK_QUOTED_STRING = /(`)([^`]+)(`)/gu

const colorizeQuotedString = (
  addStyles,
  fullString,
  startQuote,
  quotedString,
  endQuote,
  // eslint-disable-next-line max-params
) => `${startQuote}${addStyles(quotedString)}${endQuote}`
