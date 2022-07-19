import React from 'react'
import { StyleSheet, FlatList, ListRenderItem, Text, TouchableOpacity, Image } from 'react-native'
import { useNavigator, withNavigationItem } from 'hybrid-navigation'

interface Item {
  title: string
  routeName: string
}

const data: Array<Item> = [
  {
    title: '自定义字体',
    routeName: 'CustomFont',
  },
  {
    title: 'CSS Modules',
    routeName: 'CssModules',
  },
  {
    title: '分离布局组件和状态组件',
    routeName: 'LayoutAndState',
  },
  {
    title: '阴影盒子',
    routeName: 'ShadowBox',
  },
  {
    title: '处理 Android 手机吞字问题',
    routeName: 'IncompleteText',
  },
  {
    title: '确认码',
    routeName: 'Confirmation',
  },
  {
    title: '倒计时',
    routeName: 'Countdown',
  },
  {
    title: '为 PagerView 自定义 TabBar',
    routeName: 'TabBarDemo',
  },
]

function App() {
  const navigator = useNavigator()

  const renderListItem: ListRenderItem<Item> = ({ item }) => {
    return <ListItem {...item} onPress={() => navigator.push(item.routeName)} />
  }

  return <FlatList data={data} keyExtractor={item => item.title} renderItem={renderListItem} />
}

interface ListItemProps {
  title: string
  onPress?: () => void
}

function ListItem({ title, onPress }: ListItemProps) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
      <Image source={require('./assets/indicator.png')} />
    </TouchableOpacity>
  )
}

export default withNavigationItem({
  titleItem: {
    title: 'RNDemo',
  },
})(App)

const styles = StyleSheet.create({
  item: {
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingLeft: 16,
    paddingRight: 16,
  },
  text: {
    color: '#222222',
    fontSize: 17,
  },
})
