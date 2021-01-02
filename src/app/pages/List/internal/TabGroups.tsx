import React from 'react'
import styled from 'styled-components'
import {TabLists} from '../../../../shared/typings'
import {TabLinks} from './TabLinks'

type Props = {tabLists: TabLists}

const TabListElem = styled.section`
  width: 100%;
  min-width: 80%;
`

/**
 * 全てのタブグループを描画する
 * @param props
 */
export const TabGroups: React.FC<Props> = (props) => {
  return (
    <>
      {props.tabLists.map((tabList, idx) => (
        <TabListElem key={tabList.id!}>
          <h4>{tabList.title!}</h4>
          <TabLinks
            tabs={tabList.tabs}
            tabListId={tabList.id!}
            createdAt={tabList.createdAt!}
          />
        </TabListElem>
      ))}
    </>
  )
}
