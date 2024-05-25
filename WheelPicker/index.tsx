import React from 'react'
import { withNavigationItem } from 'hybrid-navigation'
import { StyleSheet, Text, View } from 'react-native'

function WheelPicker() {
  return (
    <View style={styles.container}>
      <Text>''</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default withNavigationItem({
  titleItem: {
    title: 'WheelPicker',
  },
})(WheelPicker)
