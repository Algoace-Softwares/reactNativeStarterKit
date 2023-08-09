module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'prettier/prettier': 2,
    'no-duplicate-imports': 'error',
    'no-constructor-return': 'error',
    'max-lines': ['error', {max: 400, skipBlankLines: true, skipComments: true}],
    'no-empty-function': 'error',
    'no-inline-comments': 'error',
    'no-lonely-if': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
  },
  ignorePatterns: ['src/data/index.ts'],
};
