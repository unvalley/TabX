import {useMediaQuery} from '@geist-ui/react'
import React from 'react'
import {TabLists} from '../../../../shared/typings'
import {TabLinks} from '../../molecules/TabLinks'
import {TabGroupHeader} from './internal/TabGroupHeader'
import {TabListElem} from './style'

type Props = {tabLists: TabLists; shouldShowTabGroupCounts: boolean}

/**
 * 全てのタブグループを描画する
 */
export const TabGroups: React.FC<Props> = (props) => {
  // NOTE: dont include in a loop
  const isLG = useMediaQuery('lg')

  return (
    <>
      {props.tabLists.map((tabList, idx) => (
        <TabListElem key={tabList.id!}>
          {props.shouldShowTabGroupCounts && (
            <TabGroupHeader
              tabsId={tabList.id!}
              title={''}
              isLG={isLG}
              totalTabs={tabList.tabs.length}
              hasPinned={tabList.hasPinned}
            />
          )}
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
