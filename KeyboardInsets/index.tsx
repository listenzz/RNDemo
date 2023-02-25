import React from 'react'
import { StyleSheet, TextInput, ScrollView } from 'react-native'
import { KeyboardInsetsView } from 'react-native-keyboard-insets'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function KeyboardInsets() {
  return (
    <KeyboardInsetsView extraHeight={16} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {Array.from({ length: 9 }).map((item, index) => (
          <TextInput
            key={index}
            style={styles.input}
            placeholder={`test keyboard instes ${index}`}
            textAlignVertical="center"
          />
        ))}
        <KeyboardInsetsView extraHeight={16} style={styles.keyboard}>
          <TextInput
            style={styles.input}
            placeholder={'test keyboard instes'}
            textAlignVertical="center"
          />
        </KeyboardInsetsView>
        {Array.from({ length: 10 }).map((item, index) => (
          <TextInput
            key={index + 10}
            style={styles.input}
            placeholder={`test keyboard instes ${index + 10}`}
            textAlignVertical="center"
          />
        ))}
      </ScrollView>
      <KeyboardInsetsView extraHeight={16} style={[styles.keyboard, { backgroundColor: 'lime' }]}>
        <TextInput
          style={styles.input}
          placeholder={'test keyboard instes'}
          textAlignVertical="center"
        />
        <SafeAreaView edges={['bottom']} />
      </KeyboardInsetsView>
    </KeyboardInsetsView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingBottom: 16,
  },

  input: {
    height: 40,
    marginHorizontal: 48,
    marginTop: 16,
    marginBottom: 0,
    paddingLeft: 8,
    paddingRight: 8,
    borderColor: '#cccccc',
    borderWidth: 1,
  },

  keyboard: {
    paddingBottom: 16,
    backgroundColor: 'bisque',
  },
})
