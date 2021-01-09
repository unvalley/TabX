import {useTheme} from '@geist-ui/react'
import {AlignJustify, Grid, Settings} from '@geist-ui/react-icons'
import React from 'react'
import {Colors} from '../../../constants/styles'
import {URL} from '../../../constants/urls'
import {Aside, Nav, SwitchButton} from './style'

type Props = {}

export const LeftMenu: React.FC<Props> = () => {
  const theme = useTheme()
  const asideBgColor = theme.palette.accents_2
  const buttonBgColor = theme.palette.accents_1
  const hoverBgColor = theme.palette.accents_1
  const activeBgColor =
    theme.type === 'dark' ? Colors.MOON_DARK : Colors.SUN_LIGHT
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
