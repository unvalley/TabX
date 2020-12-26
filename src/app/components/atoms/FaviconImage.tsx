import React from 'react'
import {Image} from '@geist-ui/react'

type Props = {src: string}
export const FaviconImage: React.FC<Props> = ({src}) => (
  <Image width={24} height={24} src={src} />
)
