import React, { useEffect } from 'react'

import List from './List'
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
import KeyboardDemo from './KeyboardDemo'
import KeyboardInsets from './KeyboardInsets'
import KeyboardChat from './KeyboardChat'

import Splash from './splash'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Platform } from 'react-native'

const Stack = createNativeStackNavigator()

export default function App() {
  useEffect(() => {
    Splash.hide()
  }, [])

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: '#FFFFFF' } }}>
          <Stack.Screen name="Home" component={List} options={{ title: 'RNDemo' }} />
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
            name="KeyboardDemo"
            component={KeyboardDemo}
            options={{ title: 'KeyboardDemo' }}
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
        </Stack.Navigator>
      </NavigationContainer>
      {Platform.OS === 'android' && <SafeAreaView mode="margin" edges={['bottom']} />}
    </SafeAreaProvider>
  )
}
