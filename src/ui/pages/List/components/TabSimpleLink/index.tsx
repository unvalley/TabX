import { useTheme } from '@geist-ui/react'
import X from '@geist-ui/react-icons/x'
import React, { memo } from 'react'

import { TabSimple } from '~/shared/typings'
import { omitText } from '~/shared/utils'
import { FaviconImage } from '~/ui/components/FaviconImage'
import { Rule, Spacing, Themes } from '~/ui/constants/styles'
import { useMouseOver } from '~/ui/hooks'

import { TabLinkButton, TabLinkWrapper, Title } from '../TabLinks/style'
import { TabLinkOps } from './TabLinkOps'

type Props = {
  tab: TabSimple
  index: number
  isOpsVisible?: boolean
  shouldDeleteTabWhenClicked?: boolean
  onDelete?: (tabId: number) => Promise<void>
}

const Component: React.VFC<Props> = ({ tab, index, isOpsVisible, shouldDeleteTabWhenClicked = true, onDelete }) => {
  const theme = useTheme()
  const { handleMouseOut, handleMouseOver, isMouseOvered } = useMouseOver()

  const isDark = theme.type === Themes.DARK
  const tabLinkWrapperBg = isDark ? theme.palette.accents_2 : theme.palette.accents_1

  const tabTitle = omitText(tab.title)(Rule.TITLE_MAX_LENGTH)('…')
  const isDeletable = shouldDeleteTabWhenClicked && !!onDelete

  return (
    <TabLinkWrapper
      id={String(tab.id)}
      key={tab.id}
      onMouseOver={() => handleMouseOver(index)}
      onMouseLeave={handleMouseOut}
      hoverShadow={theme.expressiveness.shadowSmall}
      bg={tabLinkWrapperBg}
    >
      <TabLinkButton
        href={tab.url}
        target="_blank"
        // TODO: fix dont use !
        onClick={() => isDeletable && onDelete!(tab.id)}
        color={theme.palette.foreground}
      >
        <span style={{ paddingRight: Spacing['0.5'] }}>
          <FaviconImage src={tab.favIconUrl} size={20} />
        </span>
        <Title>{tabTitle}</Title>
      </TabLinkButton>
      {/* Ops show when the tab is hoverd */}
      {isOpsVisible && !!onDelete && (
        // fix
        <TabLinkOps tabId={tab.id} onClick={onDelete} isVisible={isMouseOvered(index)}>
          <X size={Rule.TAB_LINKS_ELEM_SIZE} />
        </TabLinkOps>
      )}
    </TabLinkWrapper>
  )
}
export const TabSimpleLink = memo(Component)
