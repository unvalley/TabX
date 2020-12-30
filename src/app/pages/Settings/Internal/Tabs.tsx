import {Card, Col, Divider, Row, Text} from '@geist-ui/react'
import React from 'react'
import {DeleteButton} from '../../../components/molecules/DeleteButton'

export const Tabs: React.VFC<{deleteAllTabs: () => void}> = (props) => (
  <Card>
    <Card.Content>
      <Text h4>Tabs</Text>
    </Card.Content>

    <Divider y={0} />

    <Card.Content>
      <Text>ウィンドウが開かれたタイミングでTabXを起動する？</Text>
      <Text>アイコンをクリックしたときの挙動を変更する?</Text>
      <Divider y={2} />

      <Text>Danger Zone</Text>
      <Row gap={0.8} style={{}}>
        <Col span={16}>
          <Text b>Delete All Tabs</Text>
          <Text>Once you delete all tabs, there is no going back.</Text>
        </Col>
        <Col span={8}>
          <Row align="middle" style={{height: '100%', textAlign: 'center'}}>
            <Col>
              <DeleteButton onClick={props.deleteAllTabs} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Card.Content>
  </Card>
)
