import { Col, Row } from '@geist-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from '~/app/components/organisms/Menu'
import { HeaderRow, PageHeaderText } from './style'

type Props = { text?: string }

export const Header: React.VFC<Props> = ({ text }) => {
  return (
    <Row>
      <Col span={23}>
        <HeaderRow>
          <Link to={'/'} style={{ color: 'inherit' }}>
            <PageHeaderText>{text}</PageHeaderText>
          </Link>
        </HeaderRow>
      </Col>
      <Col span={1}>
        <HeaderRow>
          <Menu />
        </HeaderRow>
      </Col>
    </Row>
  )
}
