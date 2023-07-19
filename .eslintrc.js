module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  ignorePatterns: ['.eslintrc.*', 'next.config.js','typed-scss-modules.config.js'], // https://zenn.dev/warugaki/scraps/f71614869a38a5
  plugins: ['import', 'simple-import-sort', '@typescript-eslint', 'react'],
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json', // TypeScriptのLint時に参照するconfigファイルを指定
  },
  rules: {
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
    '@typescript-eslint/no-var-requires': 0,
    'react/no-danger': 'off', // it's self explainatory that no-danger should be used sparingly
    'react/react-in-jsx-scope': 'off', // next.js does not require react in most components
    'react/prop-types': 'off', // as long as TS strict mode is off this is not required
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx', '.js', '.jsx'] }],
    'no-console': 'error', // no console statements allowed
    'prettier/prettier': 'off', // don't show prettier errors as it will be fixed when saved anyway
  },
  settings: {
    // @からの絶対パスを許可
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    react: {
      version: 'detect',
    },
  },
}
