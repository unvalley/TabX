import {Card, Grid} from '@geist-ui/react'
import React from 'react'
import styled from 'styled-components'
import {TabLists} from '../../../../shared/typings'
import {Spacing} from '../../../constants/styles'
import {CardHeader} from './CardHeader'
import {TabLinks} from './TabLinks'

type Props = {tabLists: TabLists}

const TabListElem = styled.section`
  margin: ${Spacing['2']} 200px;
  width: 100%;
`

/**
 * 全てのタブグループを描画する
 * @param props
 */
export const TabGroups: React.FC<Props> = (props) => {
  return (
    <>
      {props.tabLists.map((tabList, idx) => (
        <TabListElem key={idx}>
          <Grid xs={24}>
            <Card hoverable>
              {/* TODO: typing */}
              <CardHeader tabListIdx={idx} title={String(tabList.createdAt)} />
              <TabLinks tabs={tabList.tabs} tabListIdx={idx} />
            </Card>
          </Grid>
        </TabListElem>
      ))}
    </>
  )
}
