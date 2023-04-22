import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Switch } from 'react-native'
import Floating from './Floating'

export default function FloatingBall() {
  const [enabled, setEnabled] = React.useState(false)

  useEffect(() => {
    enabled ? Floating.show() : Floating.hide()
  }, [enabled])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>开启或关闭悬浮球</Text>

      <Switch value={enabled} onValueChange={setEnabled} />
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
    fontSize: 17,
    alignSelf: 'center',
  },
})
