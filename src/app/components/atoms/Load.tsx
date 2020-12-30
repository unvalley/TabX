import React from 'react'
import {Row, Loading} from '@geist-ui/react'

export const Load: React.FC = () => (
  <Row style={{padding: '10px 0', width: '50px'}}>
    <Loading size="large" />
  </Row>
)
