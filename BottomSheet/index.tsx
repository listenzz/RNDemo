import React, { useMemo, useRef, useState } from 'react'
import {
  Animated,
  NativeSyntheticEvent,
  PixelRatio,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import { LoremIpsum } from './LoremIpsum'
import BottomSheet, {
  BottomSheetState,
  OffsetChangedEventData,
  StateChangedEventData,
} from '@sdcx/bottom-sheet'
import Button from './Button'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

const HEADER_HEIGTH = 50

const AnimatedBottomSheet = Animated.createAnimatedComponent(BottomSheet)

export default function BottomSheetScreen() {
  const [state, setBottomSheetState] = useState<BottomSheetState>('collapsed')

  const onStateChanged = (e: NativeSyntheticEvent<StateChangedEventData>) => {
    console.log(e.nativeEvent)
    setBottomSheetState(e.nativeEvent.state)
  }

  const offset = useRef(new Animated.Value(0)).current

  const backdropStyle = {
    opacity: offset.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    }),
  }

  const onSlide = useMemo(
    () =>
      Animated.event<NativeSyntheticEvent<OffsetChangedEventData>>(
        [
          {
            nativeEvent: {
              progress: offset,
            },
          },
        ],
        { useNativeDriver: true },
      ),
    [offset],
  )

  const insets = useSafeAreaInsets()

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.toolbar}>
          <Button
            text="expand"
            onPress={() => {
              setBottomSheetState('expanded')
            }}
          />
        </View>
        <LoremIpsum />
        <LoremIpsum />
        <LoremIpsum />
        <SafeAreaView edges={['bottom']} />
      </ScrollView>
      <Animated.View
        style={[StyleSheet.absoluteFill, styles.backdrop, backdropStyle]}
        pointerEvents="box-none"
      />
      <AnimatedBottomSheet
        fitToContents
        state={state}
        peekHeight={200 + insets.bottom}
        onSlide={onSlide}
        onStateChanged={onStateChanged}>
        <View style={[styles.shadow, styles.header]}>
          <Button
            text="collapse"
            onPress={() => {
              setBottomSheetState('collapsed')
            }}
          />
          <Button
            text="expand"
            onPress={() => {
              setBottomSheetState('expanded')
            }}
          />

          <Button
            text="hide"
            onPress={() => {
              setBottomSheetState('hidden')
            }}
          />
        </View>
        <View style={styles.content}>
          <LoremIpsum words={200} />
          <SafeAreaView edges={['bottom']} />
        </View>
      </AnimatedBottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  shadow: {
    shadowRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  header: {
    height: PixelRatio.roundToNearestPixel(HEADER_HEIGTH),
    backgroundColor: 'coral',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  toolbar: {
    height: HEADER_HEIGTH,
    backgroundColor: 'cadetblue',
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  content: {
    backgroundColor: '#ff9f7A',
  },
})
