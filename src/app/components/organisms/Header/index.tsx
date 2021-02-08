import {Col, Row, Text} from '@geist-ui/react'
import React from 'react'
import {useRecoilValue} from 'recoil'
import {Menu} from '~/app/components/organisms/Menu'
import {tabListsStatsState} from '../../../store'

export const Header: React.VFC = () => {
  const totalNum = useRecoilValue(tabListsStatsState)

  return (
    <Row>
      {/* Right */}
      <Col span={16}>
        <Text>TabX</Text>
      </Col>
      <Col span={8}>
        <Row align="middle" style={{height: '100%', textAlign: 'center'}}>
          <Text>Total tabs: {totalNum}</Text>
          <Menu />
        </Row>
      </Col>
    </Row>
  )
}
