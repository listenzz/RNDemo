import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { withNavigationItem } from 'hybrid-navigation'
import scss from './App.scss'

interface Props {
  name: string
}

function Welcome(props: Props) {
  return <Text style={[scss.welcome, styles.text]}>Hello {props.name}!</Text>
}

function App() {
  const [name, setName] = useState('娃娃')
  const [text, setText] = useState('')
  return (
    <View style={styles.container}>
      <Welcome name={name} />
      <TextInput value={text} onChangeText={setText} style={styles.input} />
      <Button title="确定" onPress={() => setName(text)} />
    </View>
  )
}

export default withNavigationItem({
  titleItem: {
    title: 'RnDemo',
  },
  rightBarButtonItem: {
    title: 'push',
    action: navigator => navigator.push('App'),
  },
})(App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingTop: 16,
    paddingLeft: 32,
    paddingRight: 32,
  },
  text: {
    backgroundColor: 'transparent',
    margin: 8,
  },
  input: {
    height: 40,
    marginTop: 16,
    marginBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
    borderColor: '#cccccc',
    borderWidth: 1,
  },
})
