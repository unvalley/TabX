import { Button, Loading, Spacer } from '@geist-ui/react'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { APP_NAME } from '~/core/shared/constants'
import { TabList, TabSimple } from '~/core/shared/typings'
import { Header } from '~/ui/components/Header'
import { TabListContainer } from '~/ui/components/List/TabList/TabListContainer'
import { TabSimpleLink } from '~/ui/components/List/TabSimpleLink'
import { STORAGE_KEYS } from '~/ui/constants'
import { useLoadMore, useLocalStorage } from '~/ui/hooks'
import { useFuse } from '~/ui/hooks/useFuse'

export const List: React.VFC<{ tabLists: TabList[]; tabs: TabSimple[] }> = ({ tabLists, tabs }) => {
  const { searchResults, query, onSearch } = useFuse(tabs, {
    minMatchCharLength: 1,
    shouldSort: true,
    threshold: 0.3,
    findAllMatches: true,
    useExtendedSearch: true,
    keys: ['title', 'url'],
  })
  const { t } = useTranslation()
  const [isVisibleTabListHeader] = useLocalStorage<boolean>(STORAGE_KEYS.IS_VISIBLE_TAB_LIST_HEADER)
  const [shouldDeleteTabWhenClicked] = useLocalStorage(STORAGE_KEYS.SHOULD_DELETE_TAB_WHEN_CLICKED, true)

  const perLoadCount = useMemo(() => (isVisibleTabListHeader ? 6 : 10), [isVisibleTabListHeader])
  const { itemsToShow, handleShowMoreItems, isMaxLength } = useLoadMore(perLoadCount, tabLists)
  const showHitResults = query && searchResults

  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    setHasLoaded(true)
  }, [])

  /** sliced by useLoadMore */
  const homeCurrentTabList = itemsToShow.map((item, index) => {
    return (
      <TabListContainer
        key={`${item.createdAt}_${item.id}_${index}`}
        index={index}
        isVisibleTabListHeader={isVisibleTabListHeader}
      />
    )
  })

  return (
    <>
      <Header text={APP_NAME} onSearch={onSearch} />
      {!tabLists.length && <span>{t('TAB_LISTS_EMPTY_MESSAGE')}</span>}
      {hasLoaded ? (
        <>
          {showHitResults ? (
            <>
              {searchResults.map((tab, index) => (
                <TabSimpleLink
                  key={`${tab.item.id}`}
                  tab={tab.item}
                  index={index}
                  isOpsVisible={true}
                  shouldDeleteTabWhenClicked={shouldDeleteTabWhenClicked}
                />
              ))}
            </>
          ) : (
            <>
              {homeCurrentTabList}
              <Spacer y={1} />
              {!isMaxLength && <Button onClick={handleShowMoreItems}>loadMore</Button>}
            </>
          )}
        </>
      ) : (
        <span>
          <Loading type="success"> Loading Tabs…</Loading>
        </span>
      )}
    </>
  )
}
