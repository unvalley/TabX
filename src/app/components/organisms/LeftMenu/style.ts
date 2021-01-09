import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import {Colors, Spacing} from '../../../constants/styles'

type SwitchButtonProps = {
  bgColor: string
  hoverBgColor: string
  activeBgColor: string
  iconColor: string
  hoverIconColor: string
}

// TODO: fix backgroundColor and attrs props
export const SwitchButton = styled(NavLink).attrs<SwitchButtonProps>(
  ({activeBgColor, hoverIconColor}) => ({
    activeStyle: {
      borderRadius: '16px',
      backgroundColor: activeBgColor,
      color: hoverIconColor,
    },
  }),
)<SwitchButtonProps>`
  color: ${({iconColor}) => iconColor};
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
  opacity: 0.8;
  &:hover {
    background-color: ${({hoverBgColor}) => hoverBgColor};
    opacity: 0.6;
    transition: all 0.8s ease;
  }
`

export const Aside = styled.aside<{bgColor: string}>`
  background-color: ${({bgColor}) => bgColor};
  position: fixed;
  padding: ${Spacing['0.5']} ${Spacing['1']};
  display: flex;
  min-height: 100vh;
  align-items: streach;
`
export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`
