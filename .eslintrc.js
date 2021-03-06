module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    project: './tsconfig.json',
    sourceType: 'module',
  },
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/errors',
    'plugin:import/typescript',
    'plugin:import/warnings',
    'plugin:jsx-a11y/recommended',
    'plugin:promise/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: [
    'simple-import-sort',
    'sort-class-members',
    'sort-destructure-keys',
    'sort-export-all',
    'sort-keys-fix',
    'typescript-sort-keys',
  ],
  rules: {
    'react/jsx-sort-default-props': 2,
    'react/jsx-sort-props': 2,
    'react/react-in-jsx-scope': 0,
    'react/sort-comp': 2,
    'react/sort-prop-types': 2,
    'simple-import-sort/exports': 2,
    'simple-import-sort/imports': 2,
    'sort-class-members/sort-class-members': [
      2,
      {
        order: [
          '[static-properties]',
          '[static-methods]',
          '[properties]',
          '[conventional-private-properties]',
          'constructor',
          '[methods]',
          '[conventional-private-methods]',
        ],
        accessorPairPositioning: 'getThenSet',
      },
    ],
    'sort-destructure-keys/sort-destructure-keys': 2,
    'sort-export-all/sort-export-all': 2,
    'sort-keys-fix/sort-keys-fix': 2,
    'typescript-sort-keys/interface': 'error',
    'typescript-sort-keys/string-enum': 'error',
  },
};
