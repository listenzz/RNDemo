import { NativeModules, NativeModule } from 'react-native'

type Callback = (error: Error | null) => void

interface SoftInputMode extends NativeModule {
  setAdjustNothing(callback: Callback): void
  setAdjustResize(callback: Callback): void
}

const SoftInputMode: SoftInputMode = NativeModules.SoftInputMode

function setAdjustNothing(): Promise<void> {
  return new Promise((resolve, reject) => {
    SoftInputMode.setAdjustNothing(error => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

function setAdjustResize(): Promise<void> {
  return new Promise((resolve, reject) => {
    SoftInputMode.setAdjustResize(error => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

export default {
  setAdjustNothing,
  setAdjustResize,
}
