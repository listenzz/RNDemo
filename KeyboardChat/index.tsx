import React, { useCallback, useRef, useState } from 'react'
import { Animated, findNodeHandle, Image, Pressable, Text, TextInput, View } from 'react-native'

import Message from './Message'
import { history } from './Message/data'
import styles from './styles'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardInsetsView, getEdgeInsetsForView } from 'react-native-keyboard-insets'
import { ViewDriver } from './driver/ViewDriver'
import { Driver } from './driver/Driver'
import { KeyboardDriver } from './driver/KeyboardDriver'

export default function KeyboardChat() {
  const inputRef = useRef<TextInput>(null)
  const senderRef = useRef<View>(null)
  const [senderBottom, setBottom] = useState(0)

  const onLayout = useCallback(() => {
    const viewTag = findNodeHandle(senderRef.current)
    if (viewTag === null) {
      return
    }

    getEdgeInsetsForView(viewTag, insets => {
      setBottom(insets.bottom!)
    })
  }, [])

  const emojiRef = useRef<View>(null)
  const toolboxRef = useRef<View>(null)
  const emoji = useRef(new ViewDriver('emoji', emojiRef)).current
  const toolbox = useRef(new ViewDriver('toolbox', toolboxRef)).current
  const keyboard = useRef(new KeyboardDriver(inputRef)).current

  const [driver, setDriver] = useState<Driver>()
  const [translateY, setTranslateY] = useState(new Animated.Value(0))
  const driverState = { bottom: senderBottom, driver, setDriver, setTranslateY }

  const mainStyle = {
    transform: [
      {
        translateY: translateY,
      },
    ],
  }

  return (
    <SafeAreaProvider style={styles.provider}>
      <KeyboardInsetsView
        onKeyboard={keyboard.createCallback(driverState)}
        style={[styles.fill, mainStyle]}>
        <Animated.ScrollView showsVerticalScrollIndicator={false} style={styles.inverted}>
          <View style={styles.inverted}>
            {history.map((message, index) => (
              <Message key={index} {...message} />
            ))}
          </View>
        </Animated.ScrollView>
        <Animated.View style={styles.sender} ref={senderRef} onLayout={onLayout}>
          <TextInput ref={inputRef} style={styles.input} />
          <Pressable
            style={styles.button}
            onPress={() => (emoji.shown ? keyboard.show() : emoji.show(driverState))}>
            <Image
              source={emoji.shown ? require('./icon/keyboard.png') : require('./icon/emoji.png')}
            />
          </Pressable>
          <Pressable style={styles.button} onPress={() => toolbox.toggle(driverState)}>
            <Image source={require('./icon/plus.png')} />
          </Pressable>
        </Animated.View>
      </KeyboardInsetsView>
      <SafeAreaView edges={['bottom']} />

      <Animated.View
        style={[styles.absolute, styles.red, emoji.style]}
        onLayout={emoji.onLayout}
        ref={emojiRef}>
        <View style={styles.emoji}>
          <Text style={styles.text}>表情包</Text>
        </View>
        <SafeAreaView edges={['bottom']} />
      </Animated.View>
      <Animated.View
        style={[styles.absolute, styles.blue, toolbox.style]}
        onLayout={toolbox.onLayout}
        ref={toolboxRef}>
        <View style={styles.toolbox}>
          <Text style={styles.text}>工具箱</Text>
        </View>
        <SafeAreaView edges={['bottom']} />
      </Animated.View>
    </SafeAreaProvider>
  )
}
