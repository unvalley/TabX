import { useMediaQuery } from '@geist-ui/react'
import React, { memo } from 'react'
import { useRecoilState } from 'recoil'

import { TAB_LISTS } from '~/shared/constants'
import { deleteTabLink } from '~/shared/storage'
import { TabList } from '~/shared/typings'
import { useLocalStorage } from '~/ui/hooks'
import { tabListState } from '~/ui/stores/tabList'
import { removeTab } from '~/ui/utils/producer'

import { TabSimpleLink } from '../TabSimpleLink'
import { TabListHeader } from './internal/TabListHeader'
import { TabListSection } from './style'

type Props = { index: number; isVisibleTabListHeader: boolean }

const Component: React.VFC<Props> = ({ index, isVisibleTabListHeader }) => {
  const [shouldDeleteTabWhenClicked] = useLocalStorage('shouldDeleteTabWhenClicked', true)
  const [tabList, setTabList] = useRecoilState<TabList>(tabListState(index))

  const isLG = useMediaQuery('lg')

  const handleTabDelete = async (tabId: number) => {
    await deleteTabLink(TAB_LISTS, tabList.id, tabId).then(() => {
      // TODO: fix type
      const newTabs = removeTab(tabList, tabId) as TabList
      // NOTE: handling for last tab deletion
      newTabs.tabs.length > 0 ? setTabList(newTabs) : setTabList({} as TabList)
    })
  }

  // NOTE: handling for deleting a tabList from each menu
  if (!tabList || !tabList.tabs) return <></>

  return (
    <TabListSection>
      {/* header */}
      <>
        {isVisibleTabListHeader && (
          <TabListHeader index={index} tabList={tabList} setTabList={setTabList} isLG={isLG} />
        )}
        {/* tabs */}
        {tabList.tabs.map((tab, index) => (
          <TabSimpleLink
            key={`${tab.id}_${index}`}
            tab={tab}
            index={index}
            isOpsVisible={true}
            onDelete={handleTabDelete}
            shouldDeleteTabWhenClicked={shouldDeleteTabWhenClicked}
          />
        ))}
      </>
    </TabListSection>
  )
}

export const TabListContainer = memo(Component)
