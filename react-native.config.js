module.exports = {
  dependencies: {
    'hybrid-navigation-overlay': {
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
