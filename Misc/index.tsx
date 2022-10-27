import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export default function Misc() {
  // 下面的 `Image` 实质是 `FastImage`
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={require('./image.png')} style={styles.image}>
          <Text style={styles.text}>图片中的文字</Text>
        </Image>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    padding: 16,
    // flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  image: {
    borderRadius: 8,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderRadius: 8,
  },
  text: {
    color: '#448AFF',
    fontSize: 16,
    alignSelf: 'center',
  },
})
