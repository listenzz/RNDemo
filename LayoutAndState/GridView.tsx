import { useLayout } from '@react-native-community/hooks'
import React, { PropsWithChildren } from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'

interface GridViewProps {
  style?: StyleProp<ViewStyle>
  numOfRow?: number
  spacing?: number
  verticalSpacing?: number
}

export default function GridView({
  style,
  numOfRow = 3,
  spacing = 16,
  verticalSpacing = 8,
  children,
}: PropsWithChildren<GridViewProps>) {
  const { onLayout, width } = useLayout()
  const itemWidth = (width - (numOfRow - 1) * spacing - 0.5) / numOfRow
  const count = React.Children.count(children)

  return (
    <View style={[styles.container, style]} onLayout={onLayout}>
      {React.Children.map(children, function (child: any, index) {
        const style = child.props.style
        return React.cloneElement(child, {
          style: [
            style,
            {
              width: itemWidth,
              marginLeft: index % numOfRow !== 0 ? spacing : 0,
              marginBottom:
                Math.floor(index / numOfRow) < Math.floor((count - 1) / numOfRow)
                  ? verticalSpacing
                  : 0,
            },
          ],
        })
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
})
