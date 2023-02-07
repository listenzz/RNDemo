import React, { useCallback, useMemo, useRef, useState } from 'react'
import { Animated, findNodeHandle, TextInput, View } from 'react-native'

import Message from './Message'
import { history } from './Message/data'
import styles from './styles'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import {
  KeyboardInsetsView,
  useKeyboardHeight,
  useKeyboardInsets,
  getEdgeInsetsForView,
} from 'react-native-keyboard-insets'

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

export default function KeyboardChat() {
  // 需要将 keyboardInsetsView 的 mode 设置为 ‘manual’
  const { bottom } = useKeyboardInsets()
  const keyboardHeight = useKeyboardHeight()
  const inputRef = useRef<TextInput>(null)

  const [edgeBottom, setEdgeBottom] = useState(16)

  const onLayout = useCallback(() => {
    const viewTag = findNodeHandle(inputRef.current)
    if (viewTag === null) {
      return
    }

    getEdgeInsetsForView(viewTag, insets => {
      console.log('insets', insets)
      setEdgeBottom(insets.bottom!)
    })
  }, [])

  console.log('keyboardHeight', keyboardHeight)

  const translateY = useMemo(
    () =>
      bottom
        // 实际要移动的距离 = 键盘的高度 - 输入框距屏幕底部的高度
        .interpolate({
          inputRange: [0, edgeBottom, Math.max(edgeBottom, keyboardHeight)],
          outputRange: [0, 0, Math.max(keyboardHeight - edgeBottom, 0)],
        })
        // 反转移动方向
        .interpolate({ inputRange: [-1, 0, 1], outputRange: [1, 0, -1] }),
    [bottom, keyboardHeight, edgeBottom],
  )

  const scrollViewStyle = useMemo(
    () => ({
      transform: [
        {
          translateY: translateY,
        },
        ...styles.inverted.transform,
      ],
    }),
    [translateY],
  )

  const textInputStyle = useMemo(
    () => ({
      height: 50,
      width: '100%',
      backgroundColor: '#BCBCBC',
      transform: [
        {
          translateY: translateY,
        },
      ],
    }),
    [translateY],
  )

  return (
    <SafeAreaProvider>
      <KeyboardInsetsView style={styles.container}>
        <Animated.ScrollView showsVerticalScrollIndicator={false} style={scrollViewStyle}>
          <View style={styles.inverted}>
            {history.map((message, index) => (
              <Message key={index} {...message} />
            ))}
          </View>
        </Animated.ScrollView>
        <AnimatedTextInput ref={inputRef} style={textInputStyle} onLayout={onLayout} />
        <SafeAreaView edges={['bottom']} />
      </KeyboardInsetsView>
    </SafeAreaProvider>
  )
}
