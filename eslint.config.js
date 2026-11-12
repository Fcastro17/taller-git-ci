export default [
  {
    files: ['src/**/*.js', 'test/**/*.js'],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
      },
    },
    rules: {
      eqeqeq: 'error',
      'no-empty': 'error',
      'no-unused-vars': 'error',
      'no-undef': 'error',
    },
  },
];
