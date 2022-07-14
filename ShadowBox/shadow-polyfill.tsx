import React from 'react'
import { Platform, View, StyleSheet, ViewStyle } from 'react-native'
import DropShadow from 'react-native-drop-shadow'

// @ts-ignore
const __render: any = View.render

// @ts-ignore
View.render = function (...args: any) {
  const element: React.ReactElement = __render.call(this, ...args)
  if (Platform.OS === 'ios') {
    return element
  }

  return React.cloneElement(
    element,
    {},
    React.Children.map(element.props.children, (child: React.ReactElement) => {
      if (child.type === 'RCTView') {
        return hook(child)
      }
      return child
    }),
  )
}

function hook(element: React.ReactElement) {
  const style = StyleSheet.flatten(element.props.style) || {}
  const keys = Object.keys(style)

  if (!keys.includes('shadowRadius')) {
    return element
  }

  delete style.elevation
  const { outer, inner } = splitShadowProps(style)
  const props = element.props
  delete props.style

  console.log('outer style: ', outer)
  console.log('inner style: ', inner)

  return React.createElement(
    DropShadow,
    { style: outer },
    React.cloneElement(element, { style: inner }),
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
