import React from 'react'
import { Pressable, StyleProp, StyleSheet, Text, TextStyle } from 'react-native'
import { RadioButtonItem, useRadioButtonContext } from './RadioButtonContext'

interface RadioLabelProps<T> {
  item: RadioButtonItem<T>
  style?: StyleProp<TextStyle>
  checkedStyle?: StyleProp<TextStyle>
  labelStyle?: StyleProp<TextStyle>
  labelCheckedStyle?: StyleProp<TextStyle>
}

export default function RadioLabel({
  item,
  style,
  checkedStyle,
  labelStyle,
  labelCheckedStyle,
}: RadioLabelProps<any>) {
  const [checked, onPress] = useRadioButtonContext(item)
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
