module.exports = {
  root: true,
  extends: '@react-native-community',
  globals: {
    server: true,
    alert: true,
  },
  rules: {
    'react-hooks/exhaustive-deps': 0,
    'react-native/no-inline-styles': 0,
    'no-shadow': 0,
    'max-len': ['error', {code: 120}],
  },
};
