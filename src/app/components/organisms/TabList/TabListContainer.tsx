import { useMediaQuery } from '@geist-ui/react'
import React, { memo } from 'react'
import { useLocalStorage } from '~/app/hooks'
import { TAB_LISTS } from '~/shared/constants'
import { deleteTabLink } from '~/shared/storage'
import { TabList } from '~/shared/typings'
import { TabSimpleLink } from '../../molecules/TabSimpleLink'
import { TabListHeader } from './internal/TabListHeader'
import { TabListSection } from './style'

type Props = { idx: number; isVisibleTabListHeader: boolean; tabList: TabList }

const Component: React.FC<Props> = ({ idx, isVisibleTabListHeader, tabList }) => {
  const [shouldDeleteTabWhenClicked] = useLocalStorage('shouldDeleteTabWhenClicked', true)

  const isLG = useMediaQuery('lg')

  const handleTabDelete = async (tabId: number) => {
    await deleteTabLink(TAB_LISTS, tabList.id, tabId).then(() => {
      // TODO: fix type
      // const newTabs = removeTab(tabList, tabId) as TabList
      // NOTE: handling for last tab deletion
      // newTabs.tabs.length >= 1 ? setTabList(newTabs) : setTabList({} as TabList)
    })
  }

  // NOTE: handling for deleting a tabList from each menu
  if (!tabList || !tabList.tabs) return <></>

  return (
    <TabListSection>
      {/* header */}
      <>
        {isVisibleTabListHeader && <TabListHeader idx={idx} tabList={tabList} isLG={isLG} />}
        {/* tabs */}
        {tabList.tabs.map((tab, idx) => (
          <TabSimpleLink
            tab={tab}
            idx={idx}
            shouldShowOps={true}
            onDelete={handleTabDelete}
            shouldDeleteTabWhenClicked={shouldDeleteTabWhenClicked}
          />
        ))}
      </>
    </TabListSection>
  )
}

export const TabListContainer = memo(Component)
