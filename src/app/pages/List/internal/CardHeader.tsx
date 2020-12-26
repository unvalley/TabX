import {Row, Col, Text} from '@geist-ui/react'
import {XSquare, Share, Heart} from '@geist-ui/react-icons'
import React from 'react'

type Props = {title: string; tabListIdx: number}
export const CardHeader: React.FC<Props> = (props) => {
  const pinTabListElem = () => {}
  const shareTabListElem = () => {}
  const closeTabListElem = () => {}

  return (
    <Row>
      <Col span={16}>
        <Text h3 size="1.25rem">
          {props.title}
        </Text>
      </Col>
      <Col span={8}>
        <XSquare onClick={() => closeTabListElem()} />
        <Share onClick={() => shareTabListElem()} />
        <Heart color="red" onClick={() => pinTabListElem()} />
      </Col>
    </Row>
  )
}
