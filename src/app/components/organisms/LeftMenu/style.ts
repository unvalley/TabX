import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Spacing } from '~/app/constants/styles'

type SwitchButtonProps = {
  bg: string
  hoverbg: string
  activebg: string
  iconcolor: string
  hovericoncolor: string
}

// TODO: fix backgroundColor and attrs props
export const SwitchButton = styled(NavLink).attrs<SwitchButtonProps>(({ activebg, hovericoncolor }) => ({
  activeStyle: {
    borderRadius: '16px',
    backgroundColor: activebg,
    color: hovericoncolor,
  },
}))<SwitchButtonProps>`
  color: ${({ iconcolor }) => iconcolor};
  background-color: ${({ bg }) => bg};
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
    background-color: ${({ hoverbg }) => hoverbg};
    opacity: 0.6;
    transition: all 0.8s ease;
  }
`

export const Aside = styled.aside<{ bg: string }>`
  background-color: ${({ bg }) => bg};
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
