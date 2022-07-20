import React from 'react'
import { ViewStyle, StyleProp, StyleSheet, Text, Pressable } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Item, useCheckContext } from '../CheckContext'

interface CheckBoxProps<T> {
  item: Item<T>
  style?: StyleProp<ViewStyle>
}

export default function CheckBox({ item, style }: CheckBoxProps<any>) {
  const [checked, onPress] = useCheckContext(item)
  return (
    <Pressable
      style={[styles.container, style]}
      onPress={onPress}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
      <FastImage
        source={checked ? require('./checked.png') : require('./unchecked.png')}
        resizeMode="contain"
        style={{ width: 14, height: 14 }}
      />
      <Text style={[styles.label, checked ? styles.checkedLabel : undefined]}>{item.label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: '#888888',
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  checkedLabel: {
    color: '#448AFF',
  },
})
