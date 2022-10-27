import React from 'react'
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ListRenderItemInfo,
  useWindowDimensions,
} from 'react-native'

const data = ['1', '2', '3', '4', '5']

export default function FlatListGridView() {
  const numColumns = useNumColumns()

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff' }}
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item}
      numColumns={numColumns}
    />
  )
}

function Item(info: ListRenderItemInfo<string>) {
  const numColumns = useNumColumns()
  return (
    <View style={[styles.item, { flex: 1 / numColumns }]}>
      <View style={styles.card}>
        <Text style={styles.text}>{info.item}</Text>
      </View>
    </View>
  )
}

function renderItem(info: ListRenderItemInfo<string>) {
  return <Item {...info} />
}

function useNumColumns() {
  const { width, height } = useWindowDimensions()
  const numColumns = height > width ? 2 : 3
  return numColumns
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A4A4A',
  },
  item: {
    flexShrink: 1,
    aspectRatio: 1,
    padding: 8,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
  },
  text: {
    fontSize: 24,
    color: '#448AFF',
  },
})
