import { Col, Input, Row, Spacer, useMediaQuery, useTheme } from '@geist-ui/react'
import { Moon, Search, Sun } from '@geist-ui/react-icons'
import React from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import { Menu } from '~/ui/components/Header/Menu'
import { Colors, Themes } from '~/ui/constants/styles'
import { colorThemeState } from '~/ui/stores/colorTheme'
import { isDark } from '~/ui/utils'

import { _Div, PageHeaderText } from './style'

type Props = { text?: string; onSearch?: (e: any) => void }

export const Header: React.VFC<Props> = ({ text, onSearch }) => {
  const [colorTheme, setColorTheme] = useRecoilState(colorThemeState)
  const downSM = useMediaQuery('sm', { match: 'down' })

  const theme = useTheme()
  const popoverColor = theme.palette.foreground
  const popoverBgColor = theme.palette.accents_2

  const changeColorTheme = (theme: string) => {
    setColorTheme(theme)
    localStorage.setItem('theme', theme)
  }

  const showSearchInput = !!onSearch && !downSM

  return (
    <Row>
      <Col>
        <Row justify="start" align="middle" style={{ height: '100%', textAlign: 'center' }}>
          <Link to={'/'} style={{ color: 'inherit' }}>
            <PageHeaderText>{text}</PageHeaderText>
          </Link>
          <Spacer />
          {showSearchInput && (
            <Input
              icon={<Search />}
              status="secondary"
              placeholder="Search by title or url"
              clearable={true}
              onChange={onSearch}
              style={{ margin: '0px 10px 0px 2px' }}
            />
          )}
        </Row>
      </Col>
      <Col>
        <Row justify="end" align="middle" style={{ height: '100%', textAlign: 'center' }}>
          <_Div
            color={popoverColor}
            bgColor={popoverBgColor}
            role="button"
            onClick={() => changeColorTheme(isDark(colorTheme) ? Themes.LIGHT : Themes.DARK)}
          >
            {isDark(colorTheme) ? <Sun color={Colors.SUN_LIGHT} /> : <Moon color={Colors.MOON_DARK} />}
          </_Div>
          <Menu />
        </Row>
      </Col>
    </Row>
  )
}
