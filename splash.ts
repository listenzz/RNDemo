import { NativeModules, NativeModule } from 'react-native'

interface SplashInterface extends NativeModule {
  hideSplash(): void
}

const SplashModule: SplashInterface = NativeModules.SplashModule

function hide() {
  SplashModule.hideSplash()
}

export default {
  hide,
}
