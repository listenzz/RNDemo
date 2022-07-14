import React from 'react'
import { Platform, View, StyleSheet } from 'react-native'
import DropShadow from 'react-native-drop-shadow'

// @ts-ignore
const __render: any = View.render

// @ts-ignore
View.render = function (...args: any) {
  const element: JSX.Element = __render.call(this, ...args)
  if (Platform.OS === 'ios') {
    return element
  }

  return React.Children.map(element.props.children, (child: JSX.Element) => {
    if (child.type === 'RCTView') {
      return hook(child)
    }
    return child
  })
}

function hook(element: JSX.Element) {
  const style = StyleSheet.flatten(element.props.style) || {}
  const keys = Object.keys(style)

  if (!keys.includes('shadowRadius')) {
    return element
  }

  if (React.Children.count(element.props.children) === 0) {
    return element
  }

  delete style.elevation

  if (React.Children.count(element.props.children) === 1) {
    const { children, ...props } = element.props
    delete props.style
    return React.createElement(DropShadow, { ...props, style }, children)
  }

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

function splitShadowProps(props: any) {
  let outer: any = null
  let inner: any = null

  if (props != null) {
    outer = {}
    inner = {}

    for (const prop of Object.keys(props)) {
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
          outer[prop] = props[prop]
          break
        default:
          inner[prop] = props[prop]
          break
      }
    }
  }

  return { outer, inner }
}
