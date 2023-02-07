import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, FlatList, ListRenderItem, Text, Image, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

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
  {
    title: '杂七杂八',
    routeName: 'Misc',
  },
  {
    title: 'FlatList 网格',
    routeName: 'FlatListGridView',
  },
  {
    title: '玩耍输入框',
    routeName: 'TextInputDemo',
  },
  {
    title: '避免键盘遮挡输入框',
    routeName: 'KeyboardInsets',
  },
  {
    title: '聊天应用键盘交互',
    routeName: 'KeyboardChat',
  },
]

export default function Home() {
  const navigation = useNavigation<any>()
  const insets = useSafeAreaInsets()

  const renderListItem: ListRenderItem<Item> = ({ item }) => {
    return <ListItem {...item} onPress={() => navigation.navigate(item.routeName)} />
  }

  return (
    <FlatList
      contentContainerStyle={{ paddingBottom: insets.bottom }}
      data={data}
      keyExtractor={item => item.title}
      renderItem={renderListItem}
    />
  )
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
