import React from 'react'
import { Platform, View, StyleSheet, ViewProps, ViewStyle } from 'react-native'
import DropShadow from 'react-native-drop-shadow'

// @ts-ignore
const __render: any = View.render

// @ts-ignore
View.render = function (props: ViewProps, ref: React.RefObject<View>) {
  if (Platform.OS === 'ios') {
    return __render.call(this, props, ref)
  }

  const { style, ..._props } = props

  const _style = StyleSheet.flatten(style) || {}
  const keys = Object.keys(_style)

  if (!keys.includes('shadowRadius')) {
    return __render.call(this, props, ref)
  }

  delete _style.elevation
  const { outer, inner } = splitShadowProps(_style)

  console.log('outer style: ', outer)
  console.log('inner style: ', inner)

  return React.createElement(
    DropShadow,
    { style: outer },
    __render.call(this, { ..._props, style: inner }, ref),
  )
}

type StyleKey = keyof ViewStyle

function splitShadowProps(style: ViewStyle) {
  let outer: { [key: string]: any } = {}
  let inner: { [key: string]: any } = {}

  if (style != null) {
    for (const prop of Object.keys(style) as StyleKey[]) {
      switch (prop) {
        case 'margin':
        case 'marginHorizontal':
        case 'marginVertical':
        case 'marginBottom':
        case 'marginTop':
        case 'marginLeft':
        case 'marginRight':
        case 'position':
        case 'left':
        case 'right':
        case 'bottom':
        case 'top':
        case 'shadowColor':
        case 'shadowOffset':
        case 'shadowOpacity':
        case 'shadowRadius':
          outer[prop] = style[prop]
          break
        default:
          inner[prop] = style[prop]
          break
      }
    }
  }

  return { outer, inner }
}
