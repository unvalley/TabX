import React from 'react'
import {Sun} from './icons/sun'
import {Moon} from './icons/moon'
import {Github, Settings, AlignJustify, Grid} from '@geist-ui/react-icons'
import {Colors, Spacing} from '../constants/styles'
import styled from 'styled-components'
import {useHistory} from 'react-router-dom'

type Props = {
  isDark: boolean
  switchTheme: () => void
}

const SwitchButton = styled.span`
  background-color: ${Colors.BUTTON};
  border-radius: 16px;
  outline: ${Spacing[0.5]} solid transparent;
  outline-offset: 2px;
  justify-content: center;
  flex-shrink: 0;
  padding: 1rem;
  margin: ${Spacing['0.5']} ${Spacing['0']};
  display: inline-flex;
  cursor: pointer;
`
const Aside = styled.aside`
  position: sticky;
  padding: ${Spacing['0.5']} ${Spacing['1']};
  background-color: ${Colors.PARAGRAPH};
  display: flex;
  align-items: streach;
`
const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`

export const LeftMenu: React.FC<Props> = ({isDark, switchTheme}) => {
  const [isActive, setIsActive] = React.useState(false)

  const history = useHistory()

  const handleClick = (path: string) => {
    history.push(path)
  }

  return (
    <Aside>
      <Nav>
        <SwitchButton onClick={() => handleClick('/')}>
          <AlignJustify />
        </SwitchButton>

        <SwitchButton onClick={() => handleClick('/masonry')}>
          <Grid />
        </SwitchButton>

        <SwitchButton onClick={() => handleClick('/settings')}>
          <Settings />
        </SwitchButton>

        <SwitchButton>
          {/* TODO 統一する*/}
          {isDark && <Sun onClick={switchTheme} />}
          {!isDark && <Moon onClick={switchTheme} />}
        </SwitchButton>
      </Nav>
    </Aside>
  )
}
