import { useTheme } from '@geist-ui/react'
import React, { memo } from 'react'
import { Rule, Spacing, Themes } from '~/app/constants/styles'
import { useMouseOver } from '~/app/hooks'
import { TabSimple } from '~/shared/typings'
import { omitText } from '~/shared/utils/util'
import { FaviconImage } from '../../atoms/FaviconImage'
import { TabLinkOps } from '../TabLinkOps'
import { TabLinkButton, TabLinkWrapper, Title } from '../TabLinks/style'

type Props = {
  tab: TabSimple
  idx: number
  shouldShowOps?: boolean
  shouldDeleteTabWhenClicked?: boolean
  onDelete?: (tabId: number) => Promise<void>
}

const Component: React.VFC<Props> = ({ tab, idx, shouldShowOps, shouldDeleteTabWhenClicked = true, onDelete }) => {
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
      onMouseOver={() => handleMouseOver(idx)}
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
      {shouldShowOps && onDelete && (
        <TabLinkOps tabId={tab.id} handleClick={onDelete} shouldShow={isMouseOvered(idx)} />
      )}
    </TabLinkWrapper>
  )
}
export const TabSimpleLink = memo(Component)
