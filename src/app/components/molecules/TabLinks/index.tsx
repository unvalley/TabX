import {useTheme, useToasts} from '@geist-ui/react'
import React from 'react'
import {useRecoilState} from 'recoil'
import {Tabs} from 'webextension-polyfill-ts'
import {FaviconImage} from '~/app/components/atoms/FaviconImage'
import {Rule} from '~/app/constants/rule'
import {useLocalStorage} from '~/app/hooks/useLocalStorage'
import {tabListsState} from '~/app/store'
import {deleteTabLink} from '~/shared/storage'
import {omitText} from '~/shared/utils/util'
import {removeTabLink} from '../../../store'
import {TabLinkOps} from '../TabLinkOps'
import {TabLinkButton, TabLinkWrapper, Title} from './style'

type Props = {tabs: Tabs.Tab[]; tabListId: number; createdAt: number}
/**
 * TabGroupsの要素
 * - アイコンやタイトルを表示
 */
export const TabLinks: React.FC<Props> = (props) => {
  const {tabListId, tabs} = props
  const [tabLists, setTabLists] = useRecoilState(tabListsState)
  const [mouseOver, setMouseOver] = React.useState({hover: false, idx: 0})
  const [shouldDeleteTabWhenClicked, _] = useLocalStorage<boolean>(
    'shouldDeleteTabWhenClicked',
  )

  const [, setToast] = useToasts()
  const theme = useTheme()

  const handleMouseOver = (idx: number) => {
    setMouseOver({hover: true, idx})
  }

  const handleDelete = async (tabId: number) => {
    // TODO: TabListの中で最後だった場合，タイトルが残ってしまうので処理が必要．
    await deleteTabLink(tabListId, tabId).then(() => {
      // TODO: should prevent re-render
      // - split atom
      const newAllTabLists = removeTabLink(tabLists, tabListId, tabId)
      setTabLists(newAllTabLists)
    })
    // show Toast
    setToast({
      text: 'Selected tab deleted',
    })
  }

  const isHoverd = (idx: number) =>
    mouseOver.hover === true && mouseOver.idx === idx

  return (
    <>
      {tabs.map((tab, idx) => (
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
            onClick={
              shouldDeleteTabWhenClicked
                ? () => {
                    handleDelete(tab.id!)
                  }
                : undefined
            }
            color={theme.palette.foreground}
          >
            <span style={{paddingRight: '5px'}}>
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
    </>
  )
}
