import { useTheme } from '@geist-ui/react'
import React from 'react'
import { useRecoilState } from 'recoil'
import { FaviconImage } from '~/app/components/atoms/FaviconImage'
import { TabLinkOps } from '~/app/components/molecules/TabLinkOps'
import { TabLinkButton, TabLinkWrapper, Title } from '~/app/components/molecules/TabLinks/style'
import { Rule, Spacing, Themes } from '~/app/constants/styles'
import { useLocalStorage } from '~/app/hooks/useLocalStorage'
import { useMouseOver } from '~/app/hooks/useMouseOver'
import { removeTab, tabListState } from '~/app/store'
import { TAB_LISTS } from '~/shared/constants'
import { deleteTabLink } from '~/shared/storage'
import { TabList } from '~/shared/typings'
import { omitText } from '~/shared/utils/util'
import { TabListHeader } from './internal/TabListHeader'
import { TabListSection } from './style'

type Props = { idx: number; shouldShowTabListHeader: boolean }

// container
export const TabListContainer: React.FC<Props> = props => {
  const { idx, shouldShowTabListHeader } = props
  const [tabList, setTabList] = useRecoilState<TabList>(tabListState(idx))
  const [shouldDeleteTabWhenClicked] = useLocalStorage('shouldDeleteTabWhenClicked', true)

  const theme = useTheme()
  const { handleMouseOut, handleMouseOver, isMouseOvered } = useMouseOver()

  const tabLinkWrapperBg = theme.type === Themes.DARK ? theme.palette.accents_2 : theme.palette.accents_1

  const handleTabDelete = async (tabId: number) => {
    await deleteTabLink(TAB_LISTS, tabList.id, tabId).then(() => {
      // TODO: fix
      const newTabs = removeTab(tabList, tabId) as TabList
      // NOTE: handling for last tab deletion
      newTabs.tabs.length >= 1 ? setTabList(newTabs) : setTabList({} as TabList)
    })
  }

  // NOTE: handling for deleting a tabList from each menu
  if (!tabList || !tabList.tabs) {
    return <></>
  }

  return (
    <TabListSection>
      {/* header */}
      {shouldShowTabListHeader && <TabListHeader idx={idx} tabList={tabList} isLG={true} />}
      {/* tabs */}
      {tabList.tabs.map((tab, idx) => (
        <TabLinkWrapper
          id={String(tab.id)}
          key={tab.id}
          hoverShadow={theme.expressiveness.shadowSmall}
          onMouseOver={() => handleMouseOver(idx)}
          onMouseLeave={() => handleMouseOut()}
          bg={tabLinkWrapperBg}
        >
          <TabLinkButton
            href={tab.url}
            target="_blank"
            onClick={() => shouldDeleteTabWhenClicked && handleTabDelete(tab.id)}
            color={theme.palette.foreground}
          >
            <span style={{ paddingRight: Spacing['0.5'] }}>
              <FaviconImage src={tab.favIconUrl} size={20} />
            </span>
            <Title>{omitText(tab.title)(Rule.TITLE_MAX_LENGTH)('…')}</Title>
          </TabLinkButton>
          {/* Ops show when the tab is hoverd */}
          <TabLinkOps tabId={tab.id} handleClick={handleTabDelete} shouldShow={isMouseOvered(idx)} />
        </TabLinkWrapper>
      ))}
    </TabListSection>
  )
}
