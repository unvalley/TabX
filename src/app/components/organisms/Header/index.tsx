import { Col, Input, Row, Spacer } from '@geist-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from '~/app/components/organisms/Menu'
import { HeaderRow, PageHeaderText } from './style'

type Props = { text?: string; query?: string; onSearch?: (e: any) => void }

export const Header: React.VFC<Props> = ({ text, query, onSearch }) => {
  return (
    <Row>
      <Col span={23}>
        <HeaderRow>
          <Link to={'/'} style={{ color: 'inherit' }}>
            <PageHeaderText>{text}</PageHeaderText>
          </Link>
          <Spacer />
          <Input value={query} onChange={onSearch} />
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
