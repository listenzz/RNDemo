import React from 'react'
import { Platform, StyleSheet, Text, TextProps } from 'react-native'

const defaultFontFamily = {
  ...Platform.select({
    android: { fontFamily: '' },
  }),
}

// @ts-ignore
const __render: any = Text.render

// @ts-ignore
Text.render = function (props: TextProps, ref: React.RefObject<Text>) {
  if (Platform.OS === 'ios') {
    return __render.call(this, props, ref)
  }

  const { style, ..._props } = props
  const _style = StyleSheet.flatten(style) || {}
  return __render.call(this, { ..._props, style: { ...defaultFontFamily, ..._style } }, ref)
}
