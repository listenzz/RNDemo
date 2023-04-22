import React, { useEffect } from 'react'

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
import KeyboardInsets from './KeyboardInsets'
import KeyboardChat from './KeyboardChat'

import Splash from './splash'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator, NativeStackHeaderProps } from '@react-navigation/native-stack'
import { getHeaderTitle, Header } from '@react-navigation/elements'

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Platform, View } from 'react-native'
import FloatingBall from './FloatingBall'
import PullToRefresh from './PullToRefresh'
import BottomSheet from './BottomSheet'
import NestedScroll from './NestedScroll'

const Stack = createNativeStackNavigator()

export default function App() {
  useEffect(() => {
    Splash.hide()
  }, [])

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            contentStyle: { backgroundColor: '#FFFFFF' },
          }}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'RNDemo',
              // Android 开启 Edge-to-Edge 后，首屏 Header 高度不对，疑似 react-navigation 内部 BUG
              // 这里通过自定义 Header, 简单修复
              header: Platform.OS === 'android' ? CustomHeader : undefined,
            }}
          />
          <Stack.Screen
            name="CustomFont"
            component={CustomFont}
            options={{ title: 'CustomFont' }}
          />
          <Stack.Screen
            name="CssModules"
            component={CssModules}
            options={{ title: 'CssModules' }}
          />
          <Stack.Screen
            name="LayoutAndState"
            component={LayoutAndState}
            options={{ title: 'LayoutAndState' }}
          />
          <Stack.Screen
            name="TabBarDemo"
            component={TabBarDemo}
            options={{ title: 'TabBarDemo' }}
          />
          <Stack.Screen name="ShadowBox" component={ShadowBox} options={{ title: 'ShadowBox' }} />
          <Stack.Screen
            name="IncompleteText"
            component={IncompleteText}
            options={{ title: 'IncompleteText' }}
          />
          <Stack.Screen
            name="Confirmation"
            component={Confirmation}
            options={{ title: 'Confirmation' }}
          />
          <Stack.Screen name="Countdown" component={Countdown} options={{ title: 'Countdown' }} />
          <Stack.Screen name="Misc" component={Misc} options={{ title: 'Misc' }} />
          <Stack.Screen
            name="FlatListGridView"
            component={FlatListGridView}
            options={{ title: 'FlatListGridView' }}
          />
          <Stack.Screen
            name="TextInputDemo"
            component={TextInputDemo}
            options={{ title: 'TextInputDemo' }}
          />
          <Stack.Screen
            name="KeyboardInsets"
            component={KeyboardInsets}
            options={{ title: 'KeyboardInsets' }}
          />
          <Stack.Screen
            name="KeyboardChat"
            component={KeyboardChat}
            options={{ title: 'KeyboardChat' }}
          />
          <Stack.Screen
            name="FloatingBall"
            component={FloatingBall}
            options={{ title: 'FloatingBall' }}
          />
          <Stack.Screen
            name="PullToRefresh"
            component={PullToRefresh}
            options={{ title: 'PullToRefresh' }}
          />
          <Stack.Screen
            name="BottomSheet"
            component={BottomSheet}
            options={{ title: 'BottomSheet' }}
          />
          <Stack.Screen
            name="NestedScroll"
            component={NestedScroll}
            options={{ title: 'NestedScroll' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

function CustomHeader(props: NativeStackHeaderProps) {
  const { options, route } = props

  const {
    headerTintColor,
    headerTitle,
    headerTitleAlign,
    headerTitleStyle,
    headerStyle,
    headerShadowVisible,
    headerTransparent,
    headerBackground,
  } = options

  return (
    <View style={{ elevation: 4, backgroundColor: 'white' }}>
      <SafeAreaView edges={['top']} />
      <Header
        title={getHeaderTitle(options, route.name)}
        headerTintColor={headerTintColor}
        headerTitle={
          typeof headerTitle === 'function'
            ? ({ children, tintColor }) => headerTitle({ children, tintColor })
            : headerTitle
        }
        headerTitleAlign={headerTitleAlign}
        headerTitleStyle={headerTitleStyle}
        headerTransparent={headerTransparent}
        headerShadowVisible={headerShadowVisible}
        headerBackground={headerBackground}
        headerStyle={headerStyle}
      />
    </View>
  )
}
