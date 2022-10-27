import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function CustomFont() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello 娃娃！</Text>
    </View>
  )
}

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
    fontSize: 24,
    fontFamily: 'DFWaWaSC-W5',
    alignSelf: 'center',
  },
})
