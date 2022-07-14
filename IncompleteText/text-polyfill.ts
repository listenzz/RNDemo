import React from 'react'
import { Platform, Text } from 'react-native'

const defaultFontFamily = {
  ...Platform.select({
    android: { fontFamily: '' },
  }),
}

// @ts-ignore
const __render: any = Text.render

// @ts-ignore
Text.render = function (...args: any) {
  const element: React.ReactElement = __render.call(this, ...args)

  return React.cloneElement(
    element,
    { style: [defaultFontFamily, element.props.style] },
    React.Children.map(element.props.children, function (child: React.ReactElement) {
      if (child.type === 'RCTText') {
        return hook(child)
      }
      return child
    }),
  )
}

function hook(element: React.ReactElement) {
  return React.cloneElement(element, {
    style: [defaultFontFamily, element.props.style],
  })
}
