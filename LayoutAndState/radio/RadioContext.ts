import React, { useContext } from 'react'

export interface Item<T> {
  label: string
  value: T
}

export interface RadioContext<T> {
  checkedItem?: Item<T>
  setCheckedItem: (item: Item<T> | undefined) => void
}

export const RadioContext = React.createContext<RadioContext<any>>({
  setCheckedItem: () => {},
})

export function useRadioContext(item: Item<any>) {
  const { checkedItem, setCheckedItem } = useContext(RadioContext)
  const checked = item === checkedItem
  const onPress = () => setCheckedItem(item)

  return [checked, onPress] as const
}
