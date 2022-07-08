import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface LangPageProps {
  language: string
}

export default function LangPage({ language }: LangPageProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{language}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    marginTop: 16,
    color: '#333333',
  },
})
