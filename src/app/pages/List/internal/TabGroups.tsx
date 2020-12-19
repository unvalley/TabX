import {Card, Col, Grid, Row, Text} from '@geist-ui/react'
import {Heart, Share, XSquare} from '@geist-ui/react-icons'
import React from 'react'
import {TabLists} from '../../../../shared/typings'
import {TabLinks} from './TabLinks'

type Props = {tabLists: TabLists}

const CardHeader: React.FC<{title: string}> = ({title}) => {
  const pinTabGroup = () => {}
  const shareTabGroup = () => {}
  const closeTabGroup = () => {}

  return (
    <Row>
      <Col span={16}>
        <Text h3 size="1.25rem">
          {title}
        </Text>
      </Col>
      <Col span={8}>
        <XSquare onClick={() => closeTabGroup()} />
        <Share onClick={() => shareTabGroup()} />
        <Heart color="red" onClick={() => pinTabGroup()} />
      </Col>
    </Row>
  )
}

export const TabGroups: React.FC<Props> = ({tabLists}) => {
  return (
    <>
      {tabLists.map((tabList) => (
        <section
          style={{margin: '10px 0px', width: '100%'}}
          key={tabList.createdAt}
        >
          <Grid xs={24}>
            <Card hoverable>
              {/* TODO: typing */}
              <CardHeader title={tabList.title || 'untitled'} />
              <TabLinks tabs={tabList.tabs} />
            </Card>
          </Grid>
        </section>
      ))}
    </>
  )
}
