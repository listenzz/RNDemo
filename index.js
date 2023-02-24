import Navigation from 'hybrid-navigation'
import { Platform } from 'react-native'
import Home from './Home'
import CustomFont from './CustomFont'
import CssModules from './CssModules'
import LayoutAndState from './LayoutAndState'
import TabBarDemo from './TabBarDemo'

import './ShadowBox/shadow-polyfill'
import ShadowBox from './ShadowBox'

import './IncompleteText/text-polyfill'
import IncompleteText from './IncompleteText'

import Confirmation from './Confirmation'
import Countdown from './Countdown'
import Misc from './Misc'
import './Misc/image-polyfill'

import FlatListGridView from './FlatListGridView'
import TextInputDemo from './TextInputDemo'
import KeyboardChat from './KeyboardChat'
import KeyboardInsets from './KeyboardInsets'
import { withSafeAreaProvider } from './withSafeAreaProvider'

// 配置全局样式
Navigation.setDefaultOptions({
  topBarStyle: 'dark-content',
  elevationAndroid: 4,
  statusBarColorAndroid: Platform.Version > 21 ? undefined : '#4A4A4A',
  navigationBarColorAndroid: '#FFFFFF',
  swipeBackEnabledAndroid: true,
})

// 重要必须
Navigation.startRegisterComponent(withSafeAreaProvider)

// 注意，你的每一个页面都需要注册
Navigation.registerComponent('Home', () => Home)
Navigation.registerComponent('CustomFont', () => CustomFont)
Navigation.registerComponent('CssModules', () => CssModules)
Navigation.registerComponent('LayoutAndState', () => LayoutAndState)
Navigation.registerComponent('ShadowBox', () => ShadowBox)
Navigation.registerComponent('IncompleteText', () => IncompleteText)
Navigation.registerComponent('Confirmation', () => Confirmation)
Navigation.registerComponent('Countdown', () => Countdown)
Navigation.registerComponent('TabBarDemo', () => TabBarDemo)
Navigation.registerComponent('Misc', () => Misc)
Navigation.registerComponent('FlatListGridView', () => FlatListGridView)
Navigation.registerComponent('TextInputDemo', () => TextInputDemo)
Navigation.registerComponent('KeyboardInsets', () => KeyboardInsets)
Navigation.registerComponent('KeyboardChat', () => KeyboardChat)

// 重要必须
Navigation.endRegisterComponent()

Navigation.setRoot({
  stack: {
    children: [{ screen: { moduleName: 'Home' } }],
  },
})
