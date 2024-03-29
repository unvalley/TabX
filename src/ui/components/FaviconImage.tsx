import { Image } from '@geist-ui/react'
import React from 'react'

type Props = { src: string; size?: number }
export const FaviconImage: React.FC<Props> = ({ src, size = 25 }) => {
  return <Image width={size} height={size} src={src} />
}
