import React from 'react'

type Props = {
  test: boolean
}

export const Maybe: React.FC<Props> = ({ test, children }) => <>{test && children}</>
