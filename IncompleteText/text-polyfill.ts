import React from 'react'
import { Platform, Text } from 'react-native'

// @ts-ignore
const oldTextRender: any = Text.render

// @ts-ignore
Text.render = function (...args: any) {
  const element: JSX.Element = oldTextRender.call(this, ...args)

  return React.cloneElement(
    element,
    {},
    React.Children.map(element.props.children, function (child: JSX.Element) {
      if (child.type === 'RCTText') {
        return hook(child)
      }
      return child
    }),
  )
}

function hook(element: JSX.Element) {
  const defaultFontFamily = {
    ...Platform.select({
      android: { fontFamily: '' },
    }),
  }

  return React.cloneElement(element, {
    style: [defaultFontFamily, element.props.style],
  })
}
