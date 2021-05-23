import { Loading, Row } from '@geist-ui/react'
import React from 'react'

import { Spacing } from '../constants/styles'

export const Load: React.FC = () => (
  <Row style={{ width: '50px', margin: `${Spacing[5]} auto` }}>
    <Loading size="large" type="success" />
  </Row>
)
