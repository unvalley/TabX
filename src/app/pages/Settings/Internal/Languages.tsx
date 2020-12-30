import {Card, Divider, Radio, Text} from '@geist-ui/react'
import React from 'react'

export const Languages: React.VFC = (props) => (
  <Card style={{margin: '20px 0px'}}>
    <Card.Content>
      <Text h4>Language</Text>
    </Card.Content>
    <Divider y={0} />
    <Card.Content>
      <Radio.Group value="1" useRow>
        <Radio value="1">English</Radio>
        <Radio value="2">日本語</Radio>
      </Radio.Group>
    </Card.Content>
  </Card>
)
