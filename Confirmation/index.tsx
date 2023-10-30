import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CodeInput from './CodeInput'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import { KeyboardInsetsView } from '@sdcx/keyboard-insets'

const CELL_COUNT = 4

export default function Confirmation() {
  const [value, setValue] = useState('')

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })

  return (
    <KeyboardInsetsView style={styles.container}>
      <Text style={styles.heading}>请输入你的验证码：</Text>
      <CodeInput style={styles.codeInput} value={value} onValueChange={setValue} />

      <Text style={styles.title}>CodeField example</Text>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        caretHidden={false}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}>
            <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
          </View>
        )}
      />
    </KeyboardInsetsView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 36,
  },
  heading: {
    fontSize: 14,
    color: '#333333',
  },
  codeInput: {
    marginTop: 16,
  },

  title: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: 40,
  },
  codeFieldRoot: {
    marginTop: 20,
    width: 280,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  cellText: {
    color: '#000',
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: '#007AFF',
    borderBottomWidth: 2,
  },
})
