import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Shadow } from 'react-native-shadow-2'

export default function ShadowBox() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[styles.boxShadow, styles.card]}>
        <View>
          <Text style={styles.heading}>React Native cross-platform box shadow</Text>
        </View>
        <Text>Using the Platform API to conditionally render box shadow</Text>
        <View style={styles.shadowProp}>
          <Pressable style={styles.button} onPress={() => console.log('pressed')}>
            <Text style={(styles.text, styles.buttonText)}>See more</Text>
          </Pressable>
        </View>
      </View>

      <Shadow
        startColor={'#2222223d'}
        offset={[0, 0]}
        distance={4}
        radius={8}
        containerViewStyle={{ marginHorizontal: 36 }}
        viewStyle={[styles.card, { width: '100%' }]}>
        <View>
          <Text style={styles.heading}>React Native cross-platform box shadow</Text>
        </View>
        <Text>Using the Platform API to conditionally render box shadow</Text>
      </Shadow>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 13,
    lineHeight: 30,
  },
  card: {
    backgroundColor: 'white',
    paddingVertical: 45,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  boxShadow: {
    shadowColor: '#222222',
    shadowOpacity: 0.24,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
    margin: 36,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  button: {
    backgroundColor: '#4830D3',
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
    borderRadius: 4,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
})
