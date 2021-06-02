import { Loading, Row } from '@geist-ui/react'
import React from 'react'

export const Load: React.FC = () => (
  <Row style={{ width: '50px' }}>
    <Loading size="large" type="success" />
  </Row>
)
