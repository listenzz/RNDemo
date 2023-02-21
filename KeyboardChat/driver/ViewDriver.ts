import { Animated, findNodeHandle, LayoutChangeEvent, View } from 'react-native'
import { getEdgeInsetsForView } from 'react-native-keyboard-insets'
import { Driver, DriverState } from './Driver'

export class ViewDriver implements Driver {
  constructor(public name: string, private viewRef: React.RefObject<View>) {}

  // 输入框距屏幕底部的距离
  private senderBottom = 0
  // 面板距离屏幕底部的距离
  private viewBottom = 0

  private y = 0
  private animation = new Animated.Value(0)

  shown = false
  height = 0

  show = (state: DriverState) => {
    const { bottom, driver, setDriver, setTranslateY } = state

    if (driver && driver !== this) {
      // 记录主界面当前位置
      this.y = driver.shown ? driver.height : 0
      // 隐藏前一个 driver
      driver.hide({ bottom, driver: this, setDriver, setTranslateY })
    }

    this.shown = true
    this.senderBottom = bottom
    setDriver(this)
    setTranslateY(this.translateY)

    Animated.timing(this.animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }

  hide = (state: DriverState) => {
    const { bottom, driver, setDriver, setTranslateY } = state

    this.shown = false
    this.y = 0
    this.senderBottom = bottom

    if (driver === this) {
      setDriver(undefined)
      setTranslateY(this.translateY)
      Animated.timing(this.animation, {
        toValue: this.height,
        duration: 200,
        useNativeDriver: true,
      }).start()
    } else {
      this.animation.setValue(this.height)
    }
  }

  toggle = (state: DriverState) => {
    console.log('toggle', this.shown)
    this.shown ? this.hide(state) : this.show(state)
  }

  style = {
    transform: [
      {
        translateY: this.animation,
      },
    ],
  }

  get position() {
    return this.animation.interpolate({
      inputRange: [0, this.height],
      outputRange: [this.height, 0],
    })
  }

  private get translateY() {
    const extraHeight = this.senderBottom - this.viewBottom
    console.log(this.name, 'shown', this.shown, 'height', this.height, 'y', this.y)
    if (!this.shown || this.y === 0) {
      return this.position.interpolate({
        inputRange: [extraHeight, this.height],
        outputRange: [0, extraHeight - this.height],
        extrapolate: 'clamp',
      }) as Animated.Value
    } else {
      return this.position.interpolate({
        inputRange: [0, this.height],
        outputRange: [extraHeight - this.y, extraHeight - this.height],
        extrapolate: 'clamp',
      }) as Animated.Value
    }
  }

  onLayout = (event: LayoutChangeEvent) => {
    this.animation.setValue(event.nativeEvent.layout.height)
    this.height = event.nativeEvent.layout.height
    const viewTag = findNodeHandle(this.viewRef.current)
    if (viewTag === null) {
      return
    }

    getEdgeInsetsForView(viewTag, insets => {
      this.viewBottom = insets.bottom!
    })
  }
}
