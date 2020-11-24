import React from 'react'
import {Button, Card, Col, Grid, Row, Text} from '@geist-ui/react'
import {TabLinks} from './TabLinks'
import {TabLists} from '../../../../shared/typings'
import {XSquare, Share, Heart} from '@geist-ui/react-icons'

type Props = {tabLists: TabLists}

export const TabGroups: React.FC<Props> = ({tabLists}) => {
  const pinTabGroup = () => {}
  const shareTabGroup = () => {}
  const closeTabGroup = () => {}

  return (
    <>
      {tabLists.map((tabList) => (
        <React.Fragment key={tabList.createdAt}>
          <Grid xs={24}>
            <Card>
              <Row>
                <Col span={16}>
                  <Text h3 size="1.25rem">
                    {tabList.title}
                  </Text>
                </Col>
                <Col span={8}>
                  <XSquare onClick={() => closeTabGroup()} />
                  <Share onClick={() => shareTabGroup()} />
                  <Heart color="red" onClick={() => pinTabGroup()} />
                </Col>
              </Row>
              <TabLinks tabs={tabList.tabs} />
            </Card>
          </Grid>
        </React.Fragment>
      ))}
    </>
  )
}
