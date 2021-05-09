import { Col, Row } from '@geist-ui/react'
import React from 'react'
import { Menu } from '~/app/components/organisms/Menu'
import { HeaderRow, PageHeaderText } from './style'

type Props = { text?: string }

export const Header: React.VFC<Props> = ({ text }) => {
  return (
    <Row>
      <Col span={20}>
        <HeaderRow>
          <PageHeaderText>{text}</PageHeaderText>
        </HeaderRow>
      </Col>
      <Col span={4}>
        <HeaderRow>
          <Menu />
        </HeaderRow>
      </Col>
    </Row>
  )
}
