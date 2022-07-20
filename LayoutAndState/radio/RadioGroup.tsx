import React, { PropsWithChildren } from 'react'
import { RadioContext, Item } from './RadioContext'

interface RadioGroupProps<T> {
  checkedItem?: Item<T>
  onItemChecked?: (item: Item<T> | undefined) => void
}

export default function RadioGroup({
  checkedItem,
  onItemChecked,
  children,
}: PropsWithChildren<RadioGroupProps<any>>) {
  const setCheckedItem = (item: any) => {
    onItemChecked?.(item)
  }

  return (
    <RadioContext.Provider value={{ checkedItem, setCheckedItem }}>
      {children}
    </RadioContext.Provider>
  )
}
