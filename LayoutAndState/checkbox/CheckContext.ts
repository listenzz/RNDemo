import React, { useContext } from 'react'

export interface Item<T> {
  label: string
  value: T
}

export interface CheckContext<T> {
  checkedItems: Array<Item<T>>
  setCheckedItems: (items: Array<Item<T>>) => void
}

export const CheckContext = React.createContext<CheckContext<any>>({
  checkedItems: [],
  setCheckedItems: () => {},
})

export function useCheckContext(item: Item<any>) {
  const { checkedItems, setCheckedItems } = useContext(CheckContext)
  const checked = checkedItems?.includes(item)
  const onPress = () => {
    if (checked) {
      setCheckedItems(checkedItems.filter(i => i !== item))
    } else {
      setCheckedItems([...checkedItems, item])
    }
  }

  return [checked, onPress] as const
}
