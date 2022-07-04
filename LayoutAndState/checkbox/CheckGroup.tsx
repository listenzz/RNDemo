import React, { PropsWithChildren } from 'react'
import { CheckContext, Item } from './CheckContext'

interface CheckGroupProps<T> {
  limit?: number
  checkedItems?: Array<Item<T>>
  onCheckedItemsChanged?: (items: Array<Item<T>>) => void
}

export default function CheckGroup({
  limit = 0,
  checkedItems = [],
  onCheckedItemsChanged,
  children,
}: PropsWithChildren<CheckGroupProps<any>>) {
  const setCheckedItems = (items: Array<Item<any>>) => {
    if (limit <= 0 || items.length <= limit) {
      onCheckedItemsChanged?.(items)
    }
  }

  return <CheckContext.Provider value={{ checkedItems, setCheckedItems }}>{children}</CheckContext.Provider>
}
