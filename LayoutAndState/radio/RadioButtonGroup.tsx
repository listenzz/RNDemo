import React, { PropsWithChildren } from 'react'
import { RadioButtonContext, RadioButtonItem } from './RadioButtonContext'

interface RadioButtonGroupProps<T> {
  checkedItem?: RadioButtonItem<T>
  onItemChecked?: (item: RadioButtonItem<T>) => void
}

export default function RadioButtonGroup<T>({
  checkedItem,
  onItemChecked,
  children,
}: PropsWithChildren<RadioButtonGroupProps<T>>) {
  const setCheckedItem = (item: RadioButtonItem<T>) => {
    onItemChecked?.(item)
  }

  return (
    <RadioButtonContext.Provider value={{ checkedItem, setCheckedItem }}>
      {children}
    </RadioButtonContext.Provider>
  )
}
