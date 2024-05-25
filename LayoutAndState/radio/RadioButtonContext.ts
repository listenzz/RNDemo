import React, { useContext } from 'react'

export interface RadioButtonItem<T> {
  label?: string
  value: T
}

export interface RadioButtonContext<T> {
  checkedItem?: RadioButtonItem<T>
  setCheckedItem: (item: RadioButtonItem<T>) => void
}

export const RadioButtonContext = React.createContext<RadioButtonContext<any>>({
  setCheckedItem: () => {},
})

export function useRadioButtonContext<T>(item: RadioButtonItem<T>) {
  const { checkedItem, setCheckedItem } = useContext(RadioButtonContext)
  const checked = item.value === checkedItem?.value
  const onPress = () => setCheckedItem(item)

  return [checked, onPress] as const
}
