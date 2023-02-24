import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export function withSafeAreaProvider(WrappedComponent: React.ComponentType<any>) {
  return class Provider extends React.Component {
    // 注意复制 navigationItem
    static navigationItem = (WrappedComponent as any).navigationItem

    static displayName = `withSafeAreaProvider(${WrappedComponent.displayName})`

    render() {
      return (
        <SafeAreaProvider>
          <WrappedComponent {...this.props} />
        </SafeAreaProvider>
      )
    }
  }
}
