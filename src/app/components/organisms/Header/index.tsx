import { Col, Input, Row, Spacer } from '@geist-ui/react'
import React, { ChangeEvent, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { atom, useRecoilState } from 'recoil'
import { Menu } from '~/app/components/organisms/Menu'
import { HeaderRow, PageHeaderText } from './style'

type Props = { text?: string }

export const searchState = atom<{ inputText: string }>({
  key: 'searchState',
  default: {
    inputText: '',
  },
})

export const Header: React.VFC<Props> = ({ text }) => {
  const [search, setSearch] = useRecoilState(searchState)

  const handleChangge = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch({ inputText: event.target.value })
  }, [])

  return (
    <Row>
      <Col span={23}>
        <HeaderRow>
          <Link to={'/'} style={{ color: 'inherit' }}>
            <PageHeaderText>{text}</PageHeaderText>
          </Link>
          <Spacer />
          <Input value={search.inputText} onChange={handleChangge} />
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
