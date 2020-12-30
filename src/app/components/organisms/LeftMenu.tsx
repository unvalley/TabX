import React from 'react'
import {Settings, Layers, AlignJustify, Grid} from '@geist-ui/react-icons'
import {Colors, Spacing} from '../../constants/styles'
import {URL} from '../../constants/urls'
import styled from 'styled-components'
import {NavLink} from 'react-router-dom'

type Props = {}

const SwitchButton = styled(NavLink).attrs({
  activeStyle: {borderRadius: '16px', backgroundColor: '#fff'},
})`
  text-decoration: none;
  background-color: ${Colors.BUTTON};
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
    opacity: 0.8;
    transition: all 0.8s ease;
  }
`
const Aside = styled.aside`
  position: fixed;
  padding: ${Spacing['0.5']} ${Spacing['1']};
  background-color: ${Colors.PARAGRAPH};
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
  return (
    <Aside>
      <Nav>
        {/* RootButton */}
        <SwitchButton exact to={URL.ROOT}>
          <AlignJustify />
        </SwitchButton>

        {/* MasonryButton */}
        <SwitchButton exact to={URL.MASONRY}>
          <Grid />
        </SwitchButton>

        {/* SettingsButton */}
        <SwitchButton to={URL.SETTINGS}>
          <Settings />
        </SwitchButton>
      </Nav>
    </Aside>
  )
}
