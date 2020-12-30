import {Button, Card, Divider, Row, Text} from '@geist-ui/react'
import React from 'react'
import {Github} from '@geist-ui/react-icons'

export const Contributions: React.VFC = (props) => (
  <Card style={{margin: '20px 0px'}}>
    <Card.Content style={{}}>
      <Text h4>Contribution</Text>
    </Card.Content>
    <Card.Content style={{}}>
      <div style={{display: 'flex'}}>
        <Button icon={<Github />} type="secondary">
          ia17011/TabX
        </Button>
        <Button icon={<Github />} type="secondary" style={{marginLeft: '12px'}}>
          Buy me a Coffee
        </Button>
      </div>
    </Card.Content>
  </Card>
)
