import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Pagination } from '~/app/components/molecules/Pagination'
import { Header } from '~/app/components/organisms/Header'
import { TabListContainer } from '~/app/components/organisms/TabList'
import { useLocalStorage } from '~/app/hooks/useLocalStorage'
import { TabList } from '~/shared/typings'

type Props = {
  tabLists: TabList[]
}

const MemoizedTabGroups = React.memo<{
  tabLists: TabList[]
  shouldShowTabListHeader: boolean
}>(props => (
  <>
    {props.tabLists.map((tabList, idx) => (
      <TabListContainer key={tabList.id} idx={idx} shouldShowTabListHeader={props.shouldShowTabListHeader} />
    ))}
  </>
))

MemoizedTabGroups.displayName = 'MemoizedTabGroups'

const PER_PAGE = 10
export const List: React.FC<Props> = props => {
  const { tabLists } = props
  const { t } = useTranslation()
  const [shouldShowTabListHeader] = useLocalStorage<boolean>('shouldShowTabListHeader')
  const [currentPage, setCurrentPage] = React.useState(0)
  const [offset, setOffset] = React.useState(0)

  React.useEffect(() => {
    setOffset(currentPage * PER_PAGE)
  }, [])

  const calculatePageCount = () => {
    return Math.ceil(tabLists.length / PER_PAGE)
  }
  const handlePageClick = async (selectedItem: { selected: number }) => {
    console.log(selectedItem)
    setCurrentPage(selectedItem.selected)
    setOffset(selectedItem.selected * PER_PAGE)
  }
  const calcIdx = (idx: number) => idx + currentPage * 10

  const currentPageItems = tabLists.slice(offset, offset + PER_PAGE).map((item, idx) => {
    return <TabListContainer key={item.id} idx={calcIdx(idx)} shouldShowTabListHeader={shouldShowTabListHeader} />
  })

  return (
    <>
      <Header />
      {tabLists.length > 0 ? (
        <>
          {/* <MemoizedTabGroups tabLists={tabLists} shouldShowTabListHeader={shouldShowTabListHeader} /> */}
          {currentPageItems}
          <Pagination pageLength={calculatePageCount()} handlePageClick={handlePageClick} initialPage={currentPage} />
        </>
      ) : (
        <h4>{t('TAB_LISTS_EMPTY_MESSAGE')}</h4>
      )}
    </>
  )
}
