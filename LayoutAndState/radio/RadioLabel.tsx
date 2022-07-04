import React from 'react'
import { Pressable, StyleProp, StyleSheet, Text, TextStyle } from 'react-native'
import { Item, useRadioContext } from './RadioContext'

interface RadioLabelProps<T> {
  item: Item<T>
  style?: StyleProp<TextStyle>
  checkedStyle?: StyleProp<TextStyle>
}

export default function RadioLabel({ item, style, checkedStyle }: RadioLabelProps<any>) {
  const [checked, onPress] = useRadioContext(item)
  return (
    <Pressable onPress={onPress}>
      <Text style={[styles.label, style, checked ? [styles.checked, checkedStyle] : undefined]}>{item.label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  label: {
    color: '#666666',
    fontSize: 14,
    backgroundColor: '#F0F0F0',
    height: 34,
    lineHeight: 34,
    textAlign: 'center',
    borderRadius: 4,
  },
  checked: {
    color: '#FFFFFF',
    backgroundColor: '#448AFF',
    fontWeight: 'bold',
  },
})
