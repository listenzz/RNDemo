module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-classname-to-style',
    [
      'react-native-platform-specific-extensions',
      {
        extensions: ['scss', 'sass'],
      },
    ],
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: './src',
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
          assets: './assets',
        },
      },
    ],
  ],
}
