import {useTheme} from '@geist-ui/react'
import React from 'react'
import {useRecoilState} from 'recoil'
import {Tabs} from 'webextension-polyfill-ts'
import {FaviconImage} from '~/app/components/atoms/FaviconImage'
import {Rule} from '~/app/constants/rule'
import {Spacing} from '~/app/constants/styles'
import {deleteTabLink} from '~/shared/storage'
import {TabListElem, TabWithMeta} from '~/shared/typings'
import {omitText} from '~/shared/utils/util'
import {removeTabList, tabListState} from '../../../store'
import {TabLinkOps} from '../../molecules/TabLinkOps'
import {
  TabLinkButton,
  TabLinkWrapper,
  Title,
} from '../../molecules/TabLinks/style'
import {TabListHeader} from './internal/TabListHeader'
import {TabListSection} from './style'

type Props = {shouldShowTabListHeader: boolean; idx: number}

export const TabList: React.FC<Props> = (props) => {
  const {shouldShowTabListHeader, idx} = props

  const [mouseOver, setMouseOver] = React.useState({hover: false, idx: 0})
  const [tabList, setTabList] = useRecoilState<TabListElem>(tabListState(idx))

  const theme = useTheme()

  const handleMouseOver = (idx: number) => {
    setMouseOver({hover: true, idx})
  }
  const isHoverd = (idx: number) =>
    mouseOver.hover === true && mouseOver.idx === idx

  const totalTabs = tabList.tabs.length

  const firstTabLinkTitle = omitText(tabList.tabs[0].title!)(
    Rule.TITLE_MAX_LENGTH,
  )('…')

  const displayTitle =
    totalTabs > 1
      ? `「${firstTabLinkTitle}」と${totalTabs - 1}件`
      : firstTabLinkTitle

  const handleDelete = async (tabId: number) => {
    // TODO: TabListの中で最後だった場合，タイトルが残ってしまうので処理が必要．
    await deleteTabLink(tabList.id, tabId).then(() => {
      const newTabs = removeTabList(tabList, tabId)
      setTabList(newTabs as any)
    })
  }

  return (
    <TabListSection>
      {shouldShowTabListHeader && (
        <TabListHeader
          idx={idx}
          tabListId={tabList.id!}
          title={displayTitle}
          // TODO
          isLG={true}
          totalTabs={totalTabs}
          hasPinned={tabList.hasPinned}
        />
      )}
      {(tabList.tabs as Array<Tabs.Tab | TabWithMeta>).map((tab, idx) => (
        <TabLinkWrapper
          id={String(tab.id)}
          key={tab.id!}
          hoverShadow={theme.expressiveness.shadowSmall}
          onMouseOver={() => handleMouseOver(idx)}
          onMouseLeave={() => setMouseOver({hover: false, idx: -1})}
          bgColor={theme.palette.accents_1}
        >
          <TabLinkButton
            href={tab.url}
            target="_blank"
            onClick={() => handleDelete(tab.id!)}
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
            handleDelete={handleDelete}
            shouldShow={isHoverd(idx)}
          />
        </TabLinkWrapper>
      ))}
    </TabListSection>
  )
}
