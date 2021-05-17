import { Col, Input, Row, Spacer, useTheme } from '@geist-ui/react'
import { Moon, Sun } from '@geist-ui/react-icons'
import React from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { Menu } from '~/app/components/organisms/Menu'
import { Colors, Spacing, Themes } from '~/app/constants/styles'
import { colorThemeState } from '~/app/stores/colorTheme'
import { HeaderRow, PageHeaderText } from './style'

type Props = { text?: string; query?: string; onSearch?: (e: any) => void }

const StyledDiv = styled.div<{ color: string; bgColor: string }>`
  cursor: pointer;
  border-radius: 50%;
  padding: ${Spacing['0.5']} ${Spacing['1']};
  transition: all 0.3s ease;
  &:hover {
    color: ${({ color }) => color};
    background-color: ${({ bgColor }) => bgColor};
  }
`

export const Header: React.VFC<Props> = ({ text, query, onSearch }) => {
  const [colorTheme, setColorTheme] = useRecoilState(colorThemeState)
  const theme = useTheme()
  const popoverColor = theme.palette.foreground
  const popoverBgColor = theme.palette.accents_2

  const changeColorTheme = (theme: string) => {
    setColorTheme(theme)
    localStorage.setItem('theme', theme)
  }

  return (
    <Row>
      <Col span={23}>
        <HeaderRow>
          <Link to={'/'} style={{ color: 'inherit' }}>
            <PageHeaderText>{text}</PageHeaderText>
          </Link>
          <Spacer />
          <Input value={query} onChange={onSearch} />
        </HeaderRow>
      </Col>
      <Col span={1}>
        <HeaderRow>
          <StyledDiv
            color={popoverColor}
            bgColor={popoverBgColor}
            onClick={() => changeColorTheme(colorTheme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT)}
            style={{ cursor: 'pointer' }}
          >
            {colorTheme === Themes.DARK ? <Sun color={Colors.SUN_LIGHT} /> : <Moon color={Colors.MOON_DARK} />}
          </StyledDiv>
          <Menu />
        </HeaderRow>
      </Col>
    </Row>
  )
}
