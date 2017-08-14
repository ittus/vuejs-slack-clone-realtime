// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    "indent": [2, 4],
    "semi": [2, "never"],
    "comma-dangle": ["error", "never"],
    "prefer-template": 0,
    "no-shadow": 0,
    "max-len": [2, {"code": 150, "tabWidth": 4, "ignoreUrls": true}],
    "no-param-reassign": 0,
    "no-console": process.env.NODE_ENV === 'production' ? 2 : 0,
    "import/prefer-default-export": ["off"],
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
