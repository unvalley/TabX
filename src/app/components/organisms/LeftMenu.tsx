import React from 'react'
import {Settings, AlignJustify, Grid} from '@geist-ui/react-icons'
import {useTheme} from '@geist-ui/react'
import {Colors, Spacing} from '../../constants/styles'
import {URL} from '../../constants/urls'
import styled from 'styled-components'
import {NavLink, useHistory} from 'react-router-dom'

type Props = {}

// TODO: fix backgroundColor and attrs props
const SwitchButton = styled(NavLink).attrs(({activeBgColor}: any) => ({
  activeStyle: {borderRadius: '16px', backgroundColor: '#fff'},
}))<{bgColor: string}>`
  color: ${Colors.MOON_DARK};
  background-color: ${({bgColor}) => bgColor};
  outline: ${Spacing[0.5]} solid transparent;
  outline-offset: 2px;
  justify-content: center;
  padding: 0.8rem;
  margin: ${Spacing['0.5']} ${Spacing['0']};
  display: inline-flex;
  border-radius: 33px;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 0.5);
  transition-duration: 0.1s;
  &:hover {
    opacity: 0.75;
    transition: all 0.8s ease;
  }
`

const Aside = styled.aside<{bgColor: string}>`
  background-color: ${({bgColor}) => bgColor};
  position: fixed;
  padding: ${Spacing['0.5']} ${Spacing['1']};
  display: flex;
  min-height: 100vh;
  align-items: streach;
`
const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`

export const LeftMenu: React.FC<Props> = () => {
  const theme = useTheme()
  const asideBgColor = theme.palette.accents_2
  const buttonBgColor = theme.palette.accents_2

  const history = useHistory()

  return (
    <Aside bgColor={asideBgColor}>
      <Nav>
        {/* RootButton */}
        <SwitchButton exact to={URL.ROOT} bgColor={buttonBgColor}>
          <AlignJustify />
        </SwitchButton>

        {/* MasonryButton */}
        <SwitchButton exact to={URL.MASONRY} bgColor={buttonBgColor}>
          <Grid />
        </SwitchButton>

        {/* SettingsButton */}
        <SwitchButton to={URL.SETTINGS} bgColor={buttonBgColor}>
          <Settings />
        </SwitchButton>
      </Nav>
    </Aside>
  )
}
