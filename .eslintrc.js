module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb'],
  rules: {
    'linebreak-style': ['error', 'unix'],
    'no-param-reassign': ['error', { props: false }],
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    'no-use-before-define': ['error', { functions: false }],
    //'consistent-return': 0,
  },
};
