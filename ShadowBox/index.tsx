import React from 'react'
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import { withNavigationItem } from 'hybrid-navigation'
import DropShadow from 'react-native-drop-shadow'
import { Shadow } from 'react-native-shadow-2'

function ShadowBox() {
  return (
    <View style={styles.container}>
      <DropShadow style={styles.boxShadow}>
        <View style={styles.card}>
          <View>
            <Text style={styles.heading}>React Native cross-platform box shadow</Text>
          </View>
          <Text>Using the Platform API to conditionally render box shadow</Text>
        </View>
      </DropShadow>

      <Shadow
        startColor={'#2222223d'}
        offset={[0, 0]}
        distance={4}
        radius={8}
        containerViewStyle={{ marginHorizontal: 36 }}
        viewStyle={styles.card}>
        <View>
          <Text style={styles.heading}>React Native cross-platform box shadow</Text>
        </View>
        <Text>Using the Platform API to conditionally render box shadow</Text>
      </Shadow>
    </View>
  )
}

export default withNavigationItem({
  titleItem: {
    title: 'Shadow Box',
  },
})(ShadowBox)

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
    width: '100%',
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
