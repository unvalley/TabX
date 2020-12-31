import {Card, Tag, Text} from '@geist-ui/react'
import React from 'react'

type Props = {version: string}
export const Versions: React.VFC<Props> = (props) => (
  <Card>
    <Card.Content style={{display: 'flex'}}>
      <Text h4>TabX Version</Text>
      <Tag style={{alignContent: 'flex-end', marginLeft: '400px'}}>
        Status: {props.version || 'v0.0.1'}
      </Tag>
    </Card.Content>
  </Card>
)
