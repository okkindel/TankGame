const ERROR = 2;

module.exports = {
  'env': {
    'browser': true,
    'node': true,
    'es6': true,
    'jest': true
  },
  'parser': 'babel-eslint',
  'rules': {
    'comma-dangle': [ERROR, 'never'],
    'import/newline-after-import': ['error', { 'count': 2 }],
    'jsx-quotes': [ERROR, 'prefer-single'],
    'max-len': [ERROR, 120, { 'ignoreComments': true }],
    'no-plusplus': [ERROR, { 'allowForLoopAfterthoughts': true }],
    'react/jsx-filename-extension': [ERROR, { 'extensions': ['.js'] }],
    'space-before-function-paren': ['error', 'never']
  }
};
