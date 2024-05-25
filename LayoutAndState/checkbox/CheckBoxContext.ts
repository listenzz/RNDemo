import React, { useContext } from 'react'

export interface CheckBoxItem<T> {
  label: string
  value: T
}

export interface CheckContext<T> {
  checkedItems: Array<CheckBoxItem<T>>
  setCheckedItems: (items: Array<CheckBoxItem<T>>) => void
}

export const CheckBoxContext = React.createContext<CheckContext<any>>({
  checkedItems: [],
  setCheckedItems: () => {},
})

export function useCheckBoxContext<T>(item: CheckBoxItem<T>) {
  const { checkedItems, setCheckedItems } = useContext(CheckBoxContext)
  const checked = checkedItems?.some(i => i.value === item.value)
  const onPress = () => {
    if (checked) {
      setCheckedItems(checkedItems.filter(i => i.value !== item.value))
    } else {
      setCheckedItems([...checkedItems, item])
    }
  }

  return [checked, onPress] as const
}
