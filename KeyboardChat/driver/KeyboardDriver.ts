import { TextInput, Keyboard, Animated, Platform } from 'react-native'
import { KeyboardState } from 'react-native-keyboard-insets'
import { Driver, DriverState } from './Driver'

export class KeyboardDriver implements Driver {
  constructor(private inputRef: React.RefObject<TextInput>) {}
  // 输入框距屏幕底部的距离
  private senderBottom = 0
  private y = 0
  private position = new Animated.Value(0)

  name = 'keyboard'
  shown = false
  height = 0

  show = () => {
    this.inputRef.current?.focus()
  }

  hide = () => {
    Keyboard.dismiss()
  }

  toggle = () => {
    this.shown ? this.hide() : this.show()
  }

  createCallback = (state: DriverState) => {
    return (keyboard: KeyboardState) => {
      const { shown, height, position } = keyboard

      const { bottom, driver, setDriver, setTranslateY } = state
      this.height = height
      this.position = position
      this.senderBottom = bottom

      if (shown) {
        if (Platform.OS === 'android' && this.shown) {
          return
        }

        this.shown = true
        if (driver && driver !== this) {
          // 记录主界面当前位置
          this.y = driver.shown ? driver.height : 0
          // 隐藏前一个 driver
          driver.hide({ bottom, driver: this, setDriver, setTranslateY })
        }
        setDriver(this)
        setTranslateY(this.translateY)
      }

      if (!shown) {
        if (Platform.OS === 'android' && !this.shown) {
          return
        }

        this.shown = false
        this.y = 0
        if (driver === this) {
          setDriver(undefined)
          setTranslateY(this.translateY)
        }
      }
    }
  }

  private get translateY() {
    console.log(this.name, 'shown', this.shown, 'height', this.height, 'y', this.y)
    if (!this.shown || this.y === 0) {
      return this.position
        .interpolate({
          inputRange: [0, this.senderBottom, Math.max(this.senderBottom, this.height)],
          outputRange: [0, 0, Math.max(this.height - this.senderBottom, 0)],
        })
        .interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [1, 0, -1],
        }) as Animated.Value
    } else {
      return this.position
        .interpolate({
          inputRange: [0, this.height],
          outputRange: [this.y - this.senderBottom, this.height - this.senderBottom],
        })
        .interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [1, 0, -1],
        }) as Animated.Value
    }
  }
}
