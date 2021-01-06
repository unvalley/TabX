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
  const [pinnedTabListElems, setPinnedTabListElems] = React.useState<TabLists>(
    [],
  )
  const [tabListElems, setTabListElems] = React.useState<TabLists>([])

  React.useEffect(() => {
    const onlyPinnedTabListElems = props.tabLists.filter((e) => e.hasPinned)
    setPinnedTabListElems(onlyPinnedTabListElems)

    setTabListElems(
      props.tabLists.filter(
        (e) => e.hasPinned === false || e.hasPinned === undefined,
      ),
    )
  }, [])

  return (
    <>
      {pinnedTabListElems.map((tabList, idx) => (
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

      {tabListElems.map((tabList, idx) => (
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
