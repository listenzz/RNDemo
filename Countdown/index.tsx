import { withNavigationItem } from 'hybrid-navigation'
import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useCountdown } from './useCountdown'

function Countdown() {
  const { count, start, stop } = useCountdown(10)
  const disabled = count !== 0

  console.log('countdown', count)

  return (
    <View style={styles.container}>
      <Text style={styles.count}>countdown: {count} </Text>
      <View style={styles.row}>
        <Pressable
          style={[styles.button, disabled ? styles.disable : undefined]}
          onPress={start}
          disabled={disabled}>
          <Text style={styles.buttonText}>开始</Text>
        </Pressable>
        <Pressable style={[styles.button, { marginLeft: 16 }]} onPress={stop}>
          <Text style={styles.buttonText}>停止</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default withNavigationItem({
  titleItem: {
    title: '倒计时',
  },
})(Countdown)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 36,
  },
  count: {
    color: '#333333',
    fontSize: 18,
    fontWeight: 'normal',
  },
  row: {
    marginTop: 24,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#448AFF',
    height: 48,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  disable: {
    opacity: 0.75,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
})
