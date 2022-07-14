import React from 'react'
import { Platform, Text } from 'react-native'

const defaultFontFamily = {
  ...Platform.select({
    android: { fontFamily: '' },
  }),
}

// @ts-ignore
const oldTextRender: any = Text.render

// @ts-ignore
Text.render = function (...args: any) {
  const element: JSX.Element = oldTextRender.call(this, ...args)
  const children = element.props.children

  if (typeof children === 'object') {
    return React.cloneElement(element, {
      children: React.cloneElement(children, {
        style: [defaultFontFamily, children.props.style],
      }),
    })
  }

  return React.cloneElement(element, {
    style: [defaultFontFamily, element.props.style],
  })
}
