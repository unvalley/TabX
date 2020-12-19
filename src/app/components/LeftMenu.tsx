import React from 'react'
import {Sun} from './icons/sun'
import {Moon} from './icons/moon'
import {Github, Settings, AlignJustify, Grid} from '@geist-ui/react-icons'
import {Spacing} from '../constants/styles'
import styled from 'styled-components'

type Props = {
  isDark: boolean
  switchTheme: () => void
}
const SwitchButton = styled.span`
  background-color: green;
  border-radius: 16px;
  outline: ${Spacing[0.5]} solid transparent;
  outline-offset: 2px;
  justify-content: center;
  flex-shrink: 0;
  padding: 1rem;
  margin: ${Spacing['0.5']} ${Spacing['0']};
  display: inline-flex;
`
const Aside = styled.aside`
  padding: ${Spacing['0']} ${Spacing['1']};
  margin: ${Spacing['2']} ${Spacing['0']};
`
const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`

export const LeftMenu: React.FC<Props> = ({isDark, switchTheme}) => (
  <Aside>
    <Nav>
      <SwitchButton>
        <Github />
      </SwitchButton>

      <SwitchButton>
        <AlignJustify />
      </SwitchButton>

      <SwitchButton>
        <Grid />
      </SwitchButton>

      <SwitchButton>
        <Settings />
      </SwitchButton>

      {isDark && <Sun onClick={switchTheme} />}
      {!isDark && <Moon onClick={switchTheme} />}
    </Nav>
  </Aside>
)
