export interface Anchor {
  x: number
  y: number
  size: number
}

export interface BallProps {
  anchor: Anchor
  onPress?: () => void
  onPositionChange?: (x: number, y: number) => void
}
