import React, { PropsWithChildren } from 'react'
import { CheckBoxContext, CheckBoxItem } from './CheckBoxContext'

interface CheckGroupProps<T> {
  limit?: number
  checkedItems?: Array<CheckBoxItem<T>>
  onItemsChecked?: (items: Array<CheckBoxItem<T>>) => void
}

export default function CheckGroup<T>({
  limit = 0,
  checkedItems = [],
  onItemsChecked,
  children,
}: PropsWithChildren<CheckGroupProps<T>>) {
  const setCheckedItems = (items: Array<CheckBoxItem<T>>) => {
    if (limit <= 0 || items.length <= limit) {
      onItemsChecked?.(items)
    }
  }

  return (
    <CheckBoxContext.Provider value={{ checkedItems, setCheckedItems }}>
      {children}
    </CheckBoxContext.Provider>
  )
}
