const OFF = 'off
const WARN = 'warn'
const ERROR = 'error'

module.exports = {
  plugins: [
    'simple-import-sort',
    'typescript-sort-keys',
    'sort-keys-fix',
    'sort-destructure-keys',
  ],
  rules: {
    'sort-keys-fix/sort-keys-fix': WARN,
    'sort-destructure-keys/sort-destructure-keys': WARN,
    'react/jsx-sort-props': [
      WARN,
      {
        callbacksLast: false,
        shorthandFirst: true,
        ignoreCase: true,
        noSortAlphabetically: false,
        reservedFirst: true,
      },
    ],
    'simple-import-sort/sort': WARN,
    'typescript-sort-keys/interface': WARN,
    'typescript-sort-keys/string-enum': WARN,
  },
}
