import React, { useCallback, useMemo, useRef, useState } from 'react'
import { Animated, findNodeHandle, TextInput, View } from 'react-native'

import Message from './Message'
import { history } from './Message/data'
import styles from './styles'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { KeyboardInsetsView, getEdgeInsetsForView, useKeyboard } from 'react-native-keyboard-insets'
import { withNavigationItem } from 'hybrid-navigation'

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

function KeyboardChat() {
  const inputRef = useRef<TextInput>(null)

  // 为 KeyboardInsetsView 设置 onKeyboard 回调，就会开启手动模式，需要自己处理键盘
  // 实际上这么简单的 demo，使用自动模式就可以了，这里只是为了演示手动模式的用法
  const { keyboard, onKeyboard } = useKeyboard()

  const [edgeBottom, setEdgeBottom] = useState(16)

  const onLayout = useCallback(() => {
    const viewTag = findNodeHandle(inputRef.current)
    if (viewTag === null) {
      return
    }

    getEdgeInsetsForView(viewTag, insets => {
      // console.log('insets', insets)
      setEdgeBottom(insets.bottom!)
    })
  }, [])

  const translateY = useMemo(
    () =>
      keyboard.position
        // 实际要移动的距离 = 键盘的高度 - 输入框距屏幕底部的高度
        .interpolate({
          inputRange: [0, edgeBottom, Math.max(edgeBottom, keyboard.height)],
          outputRange: [0, 0, Math.max(keyboard.height - edgeBottom, 0)],
        })
        // 反转移动方向
        .interpolate({ inputRange: [-1, 0, 1], outputRange: [1, 0, -1] }),
    [keyboard.position, keyboard.height, edgeBottom],
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
      <KeyboardInsetsView onKeyboard={onKeyboard} style={styles.container}>
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

export default withNavigationItem({
  titleItem: {
    title: '聊天键盘处理',
  },
})(KeyboardChat)
