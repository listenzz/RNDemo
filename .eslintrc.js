module.exports = {
  root: true,
  extends: ['@gfez/react-native', 'plugin:prettier/recommended', 'prettier/react'],
  overrides: [
    {
      files: ['jest/*'],
      env: {
        jest: true,
      },
    },
  ],
  rules: {
    'no-shadow': 0,
    'no-bitwise': 0,
    'react-native/no-inline-styles': 0,
    'no-restricted-imports': [
      'error',
      {
        paths: [],
      },
    ],
    'no-restricted-syntax': [
      'error',
      {
        selector:
          "ImportDeclaration[source.value='react-native'] > ImportSpecifier[imported.name=/Touchable\\w*/]",
        message: 'Use Pressable instead',
      },
      // {
      //   selector:
      //     "ImportDeclaration[source.value='react-native'] > ImportSpecifier[imported.name='Image']",
      //   message: 'Use FastImage from react-native-fast-image instead',
      // },
    ],
  },
}
