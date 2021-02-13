import { useTheme } from '@geist-ui/react'
import React from 'react'
import { useRecoilState } from 'recoil'
import { FaviconImage } from '~/app/components/atoms/FaviconImage'
import { TabLinkOps } from '~/app/components/molecules/TabLinkOps'
import { TabLinkButton, TabLinkWrapper, Title } from '~/app/components/molecules/TabLinks/style'
import { Rule, Spacing } from '~/app/constants/styles'
import { useMouseOver } from '~/app/hooks/useMouseOver'
import { removeTab, tabListState } from '~/app/store'
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

  const theme = useTheme()
  const { handleMouseOut, handleMouseOver, isMouseOvered } = useMouseOver()

  const handleTabDelete = async (tabId: number) => {
    await deleteTabLink(tabList.id, tabId).then(() => {
      const newTabs = removeTab(tabList, tabId)
      // NOTE: handling for last tab deletion
      newTabs.tabs.length >= 1 ? setTabList(newTabs) : setTabList({} as TabList)
    })
  }

  // NOTE: handling for deleting a tabList from each menu
  if (!tabList.tabs) {
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
          bgColor={theme.palette.accents_1}
        >
          <TabLinkButton
            href={tab.url}
            target="_blank"
            onClick={() => handleTabDelete(tab.id)}
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
