const { resolve } = require('path');

module.exports = {
  root: true,
  ignorePatterns: ['docs'],
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:storybook/recommended',
    'next',
    'next/core-web-vitals',
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    project: resolve(__dirname, './jsconfig.json'),
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // ESLint default rules
    // `comma-dangle` conflicts with `prettier`
    // `comma-spacing` conflicts with `prettier`
    complexity: [0, 5],
    camelcase: 0,
    'consistent-return': 0,
    'default-case': 2,
    'eol-last': 2,
    'react/no-unescaped-entities': 0,
    '@next/next/no-page-custom-font': 0,
    // `indent` conflicts with `prettier`
    // `key-spacing` conflicts with `prettier`
    // `linebreak-style` conflicts with `prettier`
    'new-parens': 2,
    'no-alert': 2,
    'no-array-constructor': 2,
    'no-caller': 2,
    // 'no-console': 2,
    'no-debugger': 0,
    'no-dupe-class-members': 2,
    'no-eq-null': 2,
    'no-eval': 2,
    '@next/next/no-sync-scripts': 0,
    'react-hooks/rules-of-hooks': 0,
    'react-hooks/exhaustive-deps': 0,
    '@next/next/link-passhref': 0,
    '@next/next/no-img-element': 0,
    '@typescript-eslint/no-var-requires': 0,
    'import/no-anonymous-default-export': 0,
    // `no-floating-decimal` conflicts with `prettier`
    'no-irregular-whitespace': 0,
    'no-magic-numbers': 0,
    // `no-multi-spaces` conflicts with `prettier`
    // `no-trailing-spaces` conflicts with `prettier`
    'no-unused-vars': 0,
    'no-use-before-define': 2,
    // `object-curly-spacing` conflicts with `prettier`
    // `quotes` conflicts with `prettier`
    // `semi` conflicts with `prettier`
    // `semi-spacing` conflicts with `prettier`
    // `space-infix-ops` conflicts with `prettier`
    // `space-in-parens` conflicts with `prettier`
    yoda: 2,
  },
  overrides: [
    {
      files: ['src/**/*.js', 'src/**/*.jsx', '.storybook/**/*.js'],
      rules: {
        // Disable ESLint default rules
        'no-use-before-define': 0,
        // Import plugin rules
        // 'import/no-relative-parent-imports': 2,
        // React rules
        'react/prop-types': 0,
        // React Hooks rules
        // 'react-hooks/exhaustive-deps': 1,
        // 'react-hooks/rules-of-hooks': 2,
      },
    },
    {
      files: ['src/**/*.stories.jsx'],
      rules: {
        'react/jsx-key': 0,
      },
    },
  ],
};
