import { useEffect, useRef, useState } from 'react'
import { Animated, Easing, EmitterSubscription, Keyboard } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'

const ACTION_BOARD_HEIGHT = 168

export default function useKeyboard() {
  const [showsActions, setShowsActions] = useState(false)
  const [showsKeyboard, setShowsKeyboard] = useState(false)

  const height = useRef(new Animated.Value(getBottomSpace())).current
  const [pendingHeight, setPendingHeight] = useState(0)

  useEffect(() => {
    const substitutions: EmitterSubscription[] = []

    substitutions.push(
      Keyboard.addListener('keyboardWillShow', ({ endCoordinates }) => {
        setPendingHeight(endCoordinates.height)
      }),
    )

    substitutions.push(
      Keyboard.addListener('keyboardWillHide', () => {
        setPendingHeight(0)
      }),
    )

    return () => substitutions.forEach(sub => sub.remove())
  }, [])

  useEffect(() => {
    height.stopAnimation()

    console.log('-------animated-------', pendingHeight, showsActions, showsKeyboard)

    let to = getBottomSpace()
    if (showsKeyboard) {
      to = pendingHeight
    }

    if (showsActions) {
      to = ACTION_BOARD_HEIGHT + getBottomSpace()
    }

    Animated.timing(height, {
      toValue: to,
      duration: 250,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: false,
    }).start()
  }, [pendingHeight, showsActions, showsKeyboard, height])

  const onPress = () => {
    Keyboard.dismiss()
    setPendingHeight(ACTION_BOARD_HEIGHT)
    setShowsActions(true)
  }

  const onBlur = () => {
    setShowsKeyboard(false)
  }

  const onFocus = () => {
    setShowsActions(false)
    setShowsKeyboard(true)
  }

  const onTouch = () => {
    if (showsActions) {
      setPendingHeight(0)
    }
    setShowsActions(false)
    setShowsKeyboard(false)
  }

  return { height, showsActions, showsKeyboard, onBlur, onFocus, onTouch, onPress }
}
