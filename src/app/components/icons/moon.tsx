import React from 'react'
import { useTheme } from '@geist-ui/react'

type Props = {
  width?: number
  height?: number
  onClick?: () => void
}

export const Moon: React.FC<Props> = props => {
  const theme = useTheme()
  const { width = 16, height = 16, ...others } = props
  return (
    <svg
      {...others}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      style={{ color: theme.palette.accents_3 }}>
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  )
}
