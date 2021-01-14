const base = require('@umijs/fabric/dist/eslint');

module.exports = {
  ...base,
  rules: {
    ...base.rules,
    '@typescript-eslint/class-name-casing': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/ban-types': 0,
    'react/no-did-update-set-state': 0,
    'react/no-find-dom-node': 0,
    'no-continue': 0,
    'jsx-a11y/label-has-for': 0,
    'react/sort-comp': 0,
    'react/prefer-stateless-function': 0,
    '@typescript-eslint/consistent-type-imports': 0,
    '@typescript-eslint/consistent-type-definitions': 0,
  },
};
