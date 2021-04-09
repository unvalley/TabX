import { Col, Row, Text } from '@geist-ui/react'
import React from 'react'
// import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { Menu } from '~/app/components/organisms/Menu'
// import { tabListsStatsState } from '../../../store'

type Props = { text?: string; shouldShowTabStats?: boolean }

const PageHeaderText = styled(Text).attrs({
  size: '1.5rem',
})`
  display: inline-block;
  font-weight: bold;
  &:hover {
    color: #5ce1e6;
  }
`

export const Header: React.VFC<Props> = props => {
  // const totalNum = useRecoilValue(tabListsStatsState)

  return (
    <Row>
      {/* Right */}
      <Col span={16}>
        <Row align="middle" style={{ height: '100%', textAlign: 'center' }}>
          <PageHeaderText>{props.text}</PageHeaderText>
        </Row>
      </Col>
      <Col span={8}>
        {props.shouldShowTabStats && (
          <Row align="middle" style={{ height: '100%', textAlign: 'center' }}>
            {/* <Text>Total tabs: {totalNum}</Text> */}
            <Menu />
          </Row>
        )}
      </Col>
    </Row>
  )
}
