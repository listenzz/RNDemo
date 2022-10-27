import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function IncompleteText() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.text} textBreakStrategy="simple">
          我在左边 完整
        </Text>
        <Text style={styles.text}>我在右边 完整</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>12345</Text>
        <Text style={styles.text}>67890</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>abcd</Text>
        <Text style={styles.text}>efgh</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>今年是 2022 年</Text>
        <Text style={styles.text}>亏了好多 ¥</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    marginTop: 16,
    marginHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 18,
    color: '#333333',
    fontWeight: 'normal',
    // fontFamily: 'DFWaWaSC-W5',
    backgroundColor: 'yellow',
  },
})
