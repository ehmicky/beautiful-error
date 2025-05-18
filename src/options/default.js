import { excludeKeys } from 'filter-obj'

// Apply default options
export const applyDefaultOpts = (opts = {}) => ({
  ...DEFAULT_OPTS,
  ...removeUndefined(opts),
})

// Default values of options
export const DEFAULT_OPTS = {
  stack: true,
  props: true,
  icon: 'cross',
  header: 'red bold',
}

// Remove `undefined` values of an object
const removeUndefined = (object) => excludeKeys(object, isUndefined)

const isUndefined = (key, value) => value === undefined
