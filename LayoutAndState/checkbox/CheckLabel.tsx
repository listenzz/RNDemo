import React from 'react'
import { Text, StyleSheet, StyleProp, TextStyle, Pressable } from 'react-native'
import { Item, useCheckContext } from './CheckContext'

interface CheckLabelProps<T> {
  item: Item<T>
  style?: StyleProp<TextStyle>
  checkedStyle?: StyleProp<TextStyle>
}

export default function CheckLabel({ item, style, checkedStyle }: CheckLabelProps<any>) {
  const [checked, onPress] = useCheckContext(item)

  return (
    <Pressable onPress={onPress}>
      <Text style={[styles.label, style, checked ? [styles.checked, checkedStyle] : undefined]}>
        {item.label}
      </Text>
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
