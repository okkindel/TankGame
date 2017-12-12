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
    'jsx-quotes': [ERROR, 'prefer-single'],
    'max-len': [ERROR, 248, { 'ignoreComments': true }],
    'no-plusplus': [ERROR, { 'allowForLoopAfterthoughts': true }],
    'space-before-function-paren': ['error', 'never']
  }
};
