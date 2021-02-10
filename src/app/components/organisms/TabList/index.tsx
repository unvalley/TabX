import {useTheme} from '@geist-ui/react'
import React from 'react'
import {useRecoilState} from 'recoil'
import {Tabs} from 'webextension-polyfill-ts'
import {FaviconImage} from '~/app/components/atoms/FaviconImage'
import {Rule} from '~/app/constants/rule'
import {Spacing} from '~/app/constants/styles'
import {useMouseOver} from '~/app/hooks/useMouseOver'
import {deleteTabLink} from '~/shared/storage'
import {TabListElem, TabWithMeta} from '~/shared/typings'
import {omitText} from '~/shared/utils/util'
import {removeTab, tabListState} from '../../../store'
import {TabLinkOps} from '../../molecules/TabLinkOps'
import {
  TabLinkButton,
  TabLinkWrapper,
  Title,
} from '../../molecules/TabLinks/style'
import {TabListHeader} from './internal/TabListHeader'
import {TabListSection} from './style'

type Props = {shouldShowTabListHeader: boolean; idx: number}

// container
export const TabList: React.FC<Props> = (props) => {
  const {shouldShowTabListHeader, idx} = props
  const [tabList, setTabList] = useRecoilState<TabListElem>(tabListState(idx))

  const theme = useTheme()
  const {handleMouseOver, handleMouseOut, isMouseOvered} = useMouseOver()

  const handleTabDelete = async (tabId: number) => {
    // TODO: TabListの中で最後だった場合，タイトルが残ってしまうので処理が必要．
    await deleteTabLink(tabList.id, tabId).then(() => {
      const newTabs = removeTab(tabList, tabId) as TabListElem
      newTabs.tabs.length >= 1
        ? setTabList(newTabs)
        : console.log('ここでTabListAtomを削除')
    })
  }

  return (
    <TabListSection>
      {/* header */}
      {shouldShowTabListHeader && (
        <TabListHeader idx={idx} tabList={tabList} isLG={true} />
      )}
      {/* tabs */}
      {(tabList.tabs as Array<Tabs.Tab | TabWithMeta>).map((tab, idx) => (
        <TabLinkWrapper
          id={String(tab.id)}
          key={tab.id!}
          hoverShadow={theme.expressiveness.shadowSmall}
          onMouseOver={() => handleMouseOver(idx)}
          onMouseLeave={() => handleMouseOut()}
          bgColor={theme.palette.accents_1}
        >
          <TabLinkButton
            href={tab.url}
            target="_blank"
            onClick={() => handleTabDelete(tab.id!)}
            color={theme.palette.foreground}
          >
            <span style={{paddingRight: Spacing['0.5']}}>
              <FaviconImage src={tab.favIconUrl!} size={20} />
            </span>
            <Title>{omitText(tab.title!)(Rule.TITLE_MAX_LENGTH)('…')}</Title>
          </TabLinkButton>
          {/* Ops show when the tab is hoverd */}
          <TabLinkOps
            tabId={tab.id!}
            handleClick={handleTabDelete}
            shouldShow={isMouseOvered(idx)}
          />
        </TabLinkWrapper>
      ))}
    </TabListSection>
  )
}
