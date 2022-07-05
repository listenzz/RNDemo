import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { withNavigationItem } from 'hybrid-navigation'

function CustomFont() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello 娃娃！</Text>
    </View>
  )
}

export default withNavigationItem({
  titleItem: {
    title: 'Custom Font',
  },
})(CustomFont)

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
