import { Col, Input, Row, Spacer, useTheme } from '@geist-ui/react'
import { Moon, Search, Sun } from '@geist-ui/react-icons'
import React from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { Menu } from '~/ui/components/Header/Menu'
import { Colors, Spacing, Themes } from '~/ui/constants/styles'
import { colorThemeState } from '~/ui/stores/colorTheme'
import { HeaderRow, PageHeaderText, _Div } from './style'

type Props = { text?: string; onSearch?: (e: any) => void }

export const Header: React.VFC<Props> = ({ text, onSearch }) => {
  const [colorTheme, setColorTheme] = useRecoilState(colorThemeState)

  const theme = useTheme()
  const popoverColor = theme.palette.foreground
  const popoverBgColor = theme.palette.accents_2

  const changeColorTheme = (theme: string) => {
    setColorTheme(theme)
    localStorage.setItem('theme', theme)
  }

  const isDark = colorTheme === Themes.DARK

  return (
    <Row>
      <Col span={22}>
        <HeaderRow>
          <Link to={'/'} style={{ color: 'inherit' }}>
            <PageHeaderText>{text}</PageHeaderText>
          </Link>
          <Spacer />
          <Input
            icon={<Search />}
            status="secondary"
            placeholder="Search tabs"
            clearable={true}
            onChange={onSearch}
            style={{ margin: '2px 10px 0px 2px' }}
          />
        </HeaderRow>
      </Col>
      <Col span={2}>
        <HeaderRow>
          <_Div
            color={popoverColor}
            bgColor={popoverBgColor}
            onClick={() => changeColorTheme(isDark ? Themes.LIGHT : Themes.DARK)}
            style={{ cursor: 'pointer', verticalAlign: 'middle', lineHeight: 0, padding: Spacing['2'] }}
          >
            {isDark ? <Sun color={Colors.SUN_LIGHT} /> : <Moon color={Colors.MOON_DARK} />}
          </_Div>
          <Menu />
        </HeaderRow>
      </Col>
    </Row>
  )
}
