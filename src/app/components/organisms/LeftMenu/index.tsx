import { useTheme } from '@geist-ui/react'
import AlignJustify from '@geist-ui/react-icons/alignJustify'
import Grid from '@geist-ui/react-icons/grid'
import Layers from '@geist-ui/react-icons/layers'
import Settings from '@geist-ui/react-icons/settings'
import React from 'react'
import { URL } from '~/app/constants'
import { Colors } from '~/app/constants/styles'
import { Aside, Nav, SwitchButton } from './style'

export const LeftMenu: React.FC = () => {
  const theme = useTheme()
  const asideBgColor = theme.palette.accents_2
  const buttonBgColor = theme.palette.accents_1
  const hoverBgColor = theme.palette.accents_1
  const activeBgColor = theme.type === 'dark' ? Colors.MOON_DARK : Colors.SUN_LIGHT
  const iconColor = theme.palette.foreground
  const hoverIconColor = theme.palette.background

  return (
    <Aside bgColor={asideBgColor}>
      <Nav>
        {/* RootButton */}
        <SwitchButton
          exact
          to={URL.ROOT}
          bgColor={buttonBgColor}
          hoverBgColor={hoverBgColor}
          activeBgColor={activeBgColor}
          iconColor={iconColor}
          hoverIconColor={hoverIconColor}
        >
          <AlignJustify />
        </SwitchButton>

        {/* MasonryButton */}
        <SwitchButton
          exact
          to={URL.MASONRY}
          bgColor={buttonBgColor}
          hoverBgColor={hoverBgColor}
          activeBgColor={activeBgColor}
          iconColor={iconColor}
          hoverIconColor={hoverIconColor}
        >
          <Grid />
        </SwitchButton>

        <SwitchButton
          exact
          to={URL.DOMAIN}
          bgColor={buttonBgColor}
          hoverBgColor={hoverBgColor}
          activeBgColor={activeBgColor}
          iconColor={iconColor}
          hoverIconColor={hoverIconColor}
        >
          <Layers />
        </SwitchButton>

        {/* SettingsButton */}
        <SwitchButton
          to={URL.SETTINGS}
          bgColor={buttonBgColor}
          hoverBgColor={hoverBgColor}
          activeBgColor={activeBgColor}
          iconColor={iconColor}
          hoverIconColor={hoverIconColor}
        >
          <Settings />
        </SwitchButton>
      </Nav>
    </Aside>
  )
}
