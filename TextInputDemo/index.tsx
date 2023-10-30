import { withNavigationItem } from 'hybrid-navigation'
import { KeyboardInsetsView } from '@sdcx/keyboard-insets'
import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

function TextInputDemo() {
  return (
    <KeyboardInsetsView style={styles.container}>
      <TextInput
        style={styles.input}
        multiline
        textAlignVertical="top"
        autoCorrect={false}
        autoCapitalize="none"
        autoComplete="off"
        selectionColor={'#448AFF'}
        value="当将 multiline 设置为 true 时，在 iOS 上，文本会与顶部对齐，而在 Andriod 上，则保持垂直居中对齐。需要将 textAlignVertical 设置为 top，才能保持两个平台的表现一致。"
      />
    </KeyboardInsetsView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    height: 120,
    backgroundColor: 'yellow',
    padding: 8,
    fontSize: 14,
    lineHeight: 24,
  },
})

export default withNavigationItem({
  titleItem: {
    title: 'TextInputDemo',
  },
})(TextInputDemo)
