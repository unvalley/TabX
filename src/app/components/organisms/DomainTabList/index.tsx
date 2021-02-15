import { useTheme } from '@geist-ui/react'
import React from 'react'
import { useRecoilState } from 'recoil'
import { FaviconImage } from '~/app/components/atoms/FaviconImage'
import { TabLinkButton, TabLinkWrapper, Title } from '~/app/components/molecules/TabLinks/style'
import { Spacing } from '~/app/constants/styles'
import { useMouseOver } from '~/app/hooks/useMouseOver'
import { removeTab } from '~/app/store'
import { domainTabListState } from '~/app/store/domainTabLists'
import { DOMAIN_TAB_LISTS } from '~/shared/constants'
import { deleteTabLink } from '~/shared/storage'
import { DomainTabList } from '~/shared/typings'
import { TabLinkOps } from '../../molecules/TabLinkOps'
import { TabListHeader } from './internal/TabListHeader'
import { TabListSection } from './style'

type Props = { idx: number; shouldShowTabListHeader: boolean }

// container
export const DomainTabListContainer: React.FC<Props> = props => {
  const { idx, shouldShowTabListHeader } = props
  const [domainTabList, setDomainTabList] = useRecoilState<DomainTabList>(domainTabListState(idx))

  const theme = useTheme()
  const { handleMouseOut, handleMouseOver, isMouseOvered } = useMouseOver()

  const handleTabDelete = async (tabId: number) => {
    await deleteTabLink(DOMAIN_TAB_LISTS, domainTabList.id, tabId)
      .then(() => {
        // TODO: fix
        const newTabs = removeTab(domainTabList, tabId) as DomainTabList
        // NOTE: handling for last tab deletion
        newTabs.tabs.length >= 1 ? setDomainTabList(newTabs) : setDomainTabList({} as DomainTabList)
      })
      .catch(err => console.error(err))
  }

  // NOTE: handling for deleting a domainTabList from each menu
  if (!domainTabList.tabs) {
    return <></>
  }

  return (
    <TabListSection>
      {/* header */}
      {shouldShowTabListHeader && <TabListHeader idx={idx} tabList={domainTabList} isLG={true} />}
      {/* tabs */}
      {domainTabList.tabs.map((tab, idx) => (
        <TabLinkWrapper
          id={String(idx)}
          key={idx}
          hoverShadow={theme.expressiveness.shadowSmall}
          onMouseOver={() => handleMouseOver(idx)}
          onMouseLeave={() => handleMouseOut()}
          bg={theme.palette.accents_1}
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
            <Title>{tab.title}</Title>
          </TabLinkButton>
          {/* Ops show when the tab is hoverd */}
          <TabLinkOps tabId={tab.id} handleClick={handleTabDelete} shouldShow={isMouseOvered(idx)} />
        </TabLinkWrapper>
      ))}
    </TabListSection>
  )
}
