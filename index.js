import { ReactRegistry, Garden, Navigator } from 'hybrid-navigation'
import { Platform } from 'react-native'
import App from './App'
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

// 配置全局样式
Garden.setStyle({
  topBarStyle: 'dark-content',
  statusBarColorAndroid: Platform.Version > 21 ? undefined : '#4A4A4A',
  swipeBackEnabledAndroid: true,
})

// 重要必须
ReactRegistry.startRegisterComponent()

// 注意，你的每一个页面都需要注册
ReactRegistry.registerComponent('App', () => App)
ReactRegistry.registerComponent('CustomFont', () => CustomFont)
ReactRegistry.registerComponent('CssModules', () => CssModules)
ReactRegistry.registerComponent('LayoutAndState', () => LayoutAndState)
ReactRegistry.registerComponent('ShadowBox', () => ShadowBox)
ReactRegistry.registerComponent('IncompleteText', () => IncompleteText)
ReactRegistry.registerComponent('Confirmation', () => Confirmation)
ReactRegistry.registerComponent('Countdown', () => Countdown)
ReactRegistry.registerComponent('TabBarDemo', () => TabBarDemo)
ReactRegistry.registerComponent('Misc', () => Misc)

// 重要必须
ReactRegistry.endRegisterComponent()

Navigator.setRoot({
  stack: {
    children: [{ screen: { moduleName: 'App' } }],
  },
})
