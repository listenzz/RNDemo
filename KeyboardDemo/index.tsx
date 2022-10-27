import React from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Text,
  ListRenderItemInfo,
  Animated,
  Pressable,
  TextInputProps,
  PressableProps,
} from 'react-native'
import useKeyboard from './useKeyboard'

const chats = ['消息1', '消息2', '消息3', '消息4', '消息5']
const actions = ['照片', '拍摄', '视频', '文件', '位置', '红包']

export default function KeyboardDemo() {
  const { height, showsActions, onPress, onFocus, onBlur, onTouch } = useKeyboard()

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.content}
        keyboardDismissMode="on-drag"
        onTouchEndCapture={onTouch}
        data={chats}
        renderItem={renderItem}
        keyExtractor={item => item}
        inverted
      />
      <View style={styles.accessary}>
        <ChatInput onPress={onPress} onFocus={onFocus} onBlur={onBlur} />
        <Animated.View style={{ height }}>{showsActions && <ActionBoard />}</Animated.View>
      </View>
    </View>
  )
}

function renderItem(info: ListRenderItemInfo<string>) {
  return <Chat {...info} />
}

function Chat({ item }: ListRenderItemInfo<string>) {
  return (
    <View style={styles.chat}>
      <Text style={styles.text}>{item}</Text>
    </View>
  )
}

interface ChatInputProps {
  onFocus: TextInputProps['onFocus']
  onBlur: TextInputProps['onBlur']
  onPress: PressableProps['onPress']
}

function ChatInput({ onFocus, onBlur, onPress }: ChatInputProps) {
  return (
    <View style={styles.inputAccessary}>
      <TextInput style={styles.input} onBlur={onBlur} onFocus={onFocus} />
      <Pressable onPress={onPress} style={styles.more}>
        <Text style={{ fontSize: 24 }}>+</Text>
      </Pressable>
    </View>
  )
}

function ActionBoard() {
  return (
    <View key="actions" collapsable={false} style={styles.actionAccessary}>
      <View style={styles.row}>
        {actions.map(action => (
          <View key={action} style={styles.action}>
            <Pressable style={styles.button}>
              <Text>{action}</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  chat: {
    padding: 16,
  },
  text: {
    fontSize: 14,
  },
  accessary: {
    backgroundColor: 'yellow',
    justifyContent: 'center',
  },
  inputAccessary: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    height: 40,
    flex: 1,
  },
  more: {
    height: 36,
    width: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionAccessary: {
    alignItems: 'center',
    height: 168,
    paddingBottom: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 'auto',
    width: 320,
  },
  action: {
    width: 80,
    height: 80,
    padding: 4,
  },
  button: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
