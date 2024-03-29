import { useMediaQuery } from '@geist-ui/react'
import React, { memo } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

import { tabService } from '~/core/services'
import { TabList } from '~/core/shared/typings'
import { STORAGE_KEYS } from '~/ui/constants'
import { useLocalStorage } from '~/ui/hooks'
import { tabListState } from '~/ui/stores/tabList'
import { removeTab } from '~/ui/utils/producer'

import { TabSimpleLink } from '../TabSimpleLink'
import { TabListHeader } from './internal/TabListHeader'
import { TabListWrapper } from './style'

type Props = { index: number; isVisibleTabListHeader: boolean }

export const TabListContainer: React.VFC<Props> = memo(({ index, isVisibleTabListHeader }) => {
  const [shouldDeleteTabWhenClicked] = useLocalStorage(STORAGE_KEYS.SHOULD_DELETE_TAB_WHEN_CLICKED, true)
  const [tabList, setTabList] = useRecoilState<TabList>(tabListState(index))

  const isLG = useMediaQuery('lg')

  const handleTabDelete = async (tabId: number) => {
    await tabService.deleteTabSimple(tabList.id, tabId).then(() => {
      const newTabs = removeTab(tabList, tabId)
      // NOTE: handling for last tab deletion
      newTabs.tabs.length > 0 ? setTabList(newTabs) : setTabList({} as TabList)
    })
  }

  // NOTE: handling for deleting a tabList from each menu
  if (!tabList || !tabList.tabs) return <></>

  return (
    <TabListWrapper>
      {isVisibleTabListHeader && (
        <>
          <TabListHeader index={index} tabList={tabList} setTabList={setTabList} isLG={isLG} />
          {tabList.description !== '' && <TabListDescription>{tabList.description}</TabListDescription>}
        </>
      )}

      {tabList.tabs.map((tab, index) => (
        <TabSimpleLink
          key={tab.id}
          tab={tab}
          index={index}
          isOpsVisible={true}
          onDelete={handleTabDelete}
          shouldDeleteTabWhenClicked={shouldDeleteTabWhenClicked}
        />
      ))}
    </TabListWrapper>
  )
})

TabListContainer.displayName = 'TabListContainer'

const TabListDescription = styled.div`
  margin-bottom: 8px;
  word-break: break-all;
`
