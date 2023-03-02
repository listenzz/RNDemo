import { statusBarHeight } from 'hybrid-navigation'
import React, { PropsWithChildren } from 'react'
import { Platform, StyleSheet, useWindowDimensions } from 'react-native'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { BallProps } from './types'

export default function Ball({
  anchor,
  children,
  onPress,
  onPositionChange = () => {},
}: PropsWithChildren<BallProps>) {
  const barHeight = statusBarHeight()
  const offsetY = Platform.OS === 'android' ? statusBarHeight() : 0

  const { width: windowWidth, height: windowHeight } = useWindowDimensions()

  const gap = 8

  const transf = useSharedValue({ x: 0, y: 0 })
  const x = useSharedValue(anchor.x)
  const y = useSharedValue(anchor.y)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: transf.value.x }, { translateY: transf.value.y }],
      width: anchor.size,
      height: anchor.size,
      borderRadius: anchor.size / 2,
      overflow: 'hidden',
    }
  })

  const floatStyles = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      left: x.value,
      top: y.value,
    }
  })

  const singleTap = Gesture.Tap()
    .maxDistance(2)
    .onEnd(runOnJS(() => onPress?.()))

  const dragGesture = Gesture.Pan()
    .onChange(e => {
      transf.value = { x: e.changeX + transf.value.x, y: e.changeY + transf.value.y }
    })
    .onFinalize(e => {
      transf.value = { x: 0, y: 0 }
      x.value = e.absoluteX - e.x
      const finalX =
        x.value > (windowWidth - anchor.size) / 2 ? windowWidth - anchor.size - gap : gap
      x.value = withSpring(finalX, {
        stiffness: 500,
        overshootClamping: true,
      })
      y.value = e.absoluteY + offsetY - e.y
      const finalY = Math.min(Math.max(barHeight, y.value), windowHeight - anchor.size - gap)
      y.value = withSpring(finalY, {
        stiffness: 500,
        overshootClamping: true,
      })

      runOnJS(onPositionChange)(finalX, finalY)
    })

  return (
    <Animated.View style={[styles.shadow, floatStyles]}>
      <GestureHandlerRootView>
        <GestureDetector gesture={Gesture.Simultaneous(dragGesture, singleTap)}>
          <Animated.View style={[animatedStyles]}>{children}</Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowRadius: 8,
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
})
