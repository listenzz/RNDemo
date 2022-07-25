import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'
import SoftInputMode from './SoftInputMode'

export default function useKeyboard() {
  useEffect(() => {
    return () => {
      SoftInputMode.setAdjustResize()
    }
  }, [])

  const [showsActions, setShowsActions] = useState(false)
  const [showsKeyboard, setShowsKeyboard] = useState(false)

  const height = 'auto'

  const onPress = async () => {
    Keyboard.dismiss()
    await SoftInputMode.setAdjustNothing()
    requestAnimationFrame(() => {
      setShowsActions(true)
    })
  }

  const onBlur = () => {
    setShowsKeyboard(false)
  }

  const onFocus = async () => {
    await SoftInputMode.setAdjustResize()
    requestAnimationFrame(() => {
      setShowsActions(false)
      setShowsKeyboard(true)
    })
  }

  const onTouch = () => {
    setShowsActions(false)
    setShowsKeyboard(false)
  }

  return { height, showsKeyboard, showsActions, onPress, onBlur, onFocus, onTouch }
}
