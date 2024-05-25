import React from 'react'
import { Text, StyleSheet, StyleProp, TextStyle, Pressable, ViewStyle } from 'react-native'
import { CheckBoxItem, useCheckBoxContext } from './CheckBoxContext'

interface CheckLabelProps<T> {
  item: CheckBoxItem<T>
  style?: StyleProp<ViewStyle>
  checkedStyle?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
  labelCheckedStyle?: StyleProp<TextStyle>
}

export default function CheckLabel({
  item,
  style,
  checkedStyle,
  labelStyle,
  labelCheckedStyle,
}: CheckLabelProps<any>) {
  const [checked, onPress] = useCheckBoxContext(item)

  return (
    <Pressable
      style={[styles.button, style, checked ? [styles.buttonChecked, checkedStyle] : undefined]}
      onPress={onPress}>
      <Text
        style={[
          styles.label,
          labelStyle,
          checked ? [styles.labelChecked, labelCheckedStyle] : undefined,
        ]}>
        {item.label}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
  },
  buttonChecked: {
    backgroundColor: '#448AFF',
  },
  label: {
    color: '#666666',
    fontSize: 14,
    height: 34,
    lineHeight: 34,
    textAlign: 'center',
  },
  labelChecked: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
})
