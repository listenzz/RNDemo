module.exports = {
  dependencies: {
    '@sdcx/overlay': {
      platforms: {
        android: {
          packageInstance: 'new OverlayPackage(getReactNativeHost())',
        },
      },
    },
  },
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts/'],
}
