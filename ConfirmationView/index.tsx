import { withNavigationItem } from 'hybrid-navigation'
import React from 'react'
import { View, Text } from 'react-native'

function ConfirmationView() {
  return (
    <View>
      <Text>ConfirmationView</Text>
    </View>
  )
}

export default withNavigationItem({
  titleItem: {
    title: '确认码',
  },
})(ConfirmationView)
