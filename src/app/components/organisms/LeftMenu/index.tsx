import {useTheme} from '@geist-ui/react'
import {AlignJustify, Grid, Settings} from '@geist-ui/react-icons'
import React from 'react'
import {useHistory} from 'react-router-dom'
import {URL} from '../../../constants/urls'
import {Aside, Nav, SwitchButton} from './style'

type Props = {}

export const LeftMenu: React.FC<Props> = () => {
  const theme = useTheme()
  const asideBgColor = theme.palette.accents_3
  const buttonBgColor = theme.palette.accents_2
  const hoverBgColor = theme.palette.accents_2

  const history = useHistory()

  return (
    <Aside bgColor={asideBgColor}>
      <Nav>
        {/* RootButton */}
        <SwitchButton
          exact
          to={URL.ROOT}
          bgColor={buttonBgColor}
          hoverBgColor={hoverBgColor}
        >
          <AlignJustify />
        </SwitchButton>

        {/* MasonryButton */}
        <SwitchButton
          exact
          to={URL.MASONRY}
          bgColor={buttonBgColor}
          hoverBgColor={hoverBgColor}
        >
          <Grid />
        </SwitchButton>

        {/* SettingsButton */}
        <SwitchButton
          to={URL.SETTINGS}
          bgColor={buttonBgColor}
          hoverBgColor={hoverBgColor}
        >
          <Settings />
        </SwitchButton>
      </Nav>
    </Aside>
  )
}
