import {Card, Divider, Text} from '@geist-ui/react'
import React from 'react'
type Props = {}
export const ColorThemes: React.VFC<Props> = (props) => (
  <Card>
    <Card.Content>
      <Text h4>Color Themes</Text>
    </Card.Content>
    <Divider y={0} />
    <Card.Content>
      <Text>Setting Theme: WIP</Text>
    </Card.Content>
  </Card>
)
