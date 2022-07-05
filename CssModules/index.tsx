import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { withNavigationItem } from 'hybrid-navigation'
import scss from './index.scss'

function Welcome() {
  return <Text style={[scss.welcome, styles.text]}>你好 CSS！</Text>
}

function CssModules() {
  const [text, setText] = useState('输入一段测试文字\n换行测试')
  return (
    <View style={scss.container}>
      <Welcome />
      <TextInput
        value={text}
        onChangeText={setText}
        style={scss.input}
        multiline={true}
        textAlignVertical="top"
      />
    </View>
  )
}

export default withNavigationItem({
  titleItem: {
    title: 'Css Modules',
  },
})(CssModules)

const styles = StyleSheet.create({
  text: {
    backgroundColor: 'transparent',
    margin: 8,
  },
})
