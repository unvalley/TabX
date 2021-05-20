import { useTheme } from '@geist-ui/react'
import AlignJustify from '@geist-ui/react-icons/alignJustify'
import Settings from '@geist-ui/react-icons/settings'
import React from 'react'
import { URL } from '~/app/constants'
import { Aside, Nav, SwitchButton } from './style'

export const LeftMenu: React.FC = () => {
  const theme = useTheme()
  const asideBgColor = theme.palette.accents_2
  const buttonBgColor = theme.palette.accents_1
  const hoverbg = theme.palette.accents_1
  const activebg = theme.palette.accents_8
  const iconcolor = theme.palette.foreground
  const hovericoncolor = theme.palette.background

  return (
    <Aside bg={asideBgColor}>
      <Nav>
        {/* RootButton */}
        <SwitchButton
          exact
          to={URL.ROOT}
          bg={buttonBgColor}
          hoverbg={hoverbg}
          activebg={activebg}
          iconcolor={iconcolor}
          hovericoncolor={hovericoncolor}
        >
          <AlignJustify />
        </SwitchButton>

        {/* SettingsButton */}
        <SwitchButton
          to={URL.SETTINGS}
          bg={buttonBgColor}
          hoverbg={hoverbg}
          activebg={activebg}
          iconcolor={iconcolor}
          hovericoncolor={hovericoncolor}
        >
          <Settings />
        </SwitchButton>
      </Nav>
    </Aside>
  )
}
