import { Card, Radio, Spacer, Text } from '@geist-ui/react'
import { Moon, Sun } from '@geist-ui/react-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'
import { Colors, Themes } from '../../../constants/styles'
import { colorThemeState } from '../../../stores/colorTheme'

export const ColorThemes: React.VFC = () => {
  const { t } = useTranslation()
  const [colorTheme, setColorTheme] = useRecoilState(colorThemeState)

  const handleChange = (val: React.ReactText) => {
    setColorTheme(val.toString())
    localStorage.setItem('theme', val.toString())
  }

  return (
    <Card>
      <Card.Content>
        <Text h4>{t('COLOR_THEMES')}</Text>
      </Card.Content>

      <Card.Content>
        <Radio.Group value={colorTheme} useRow onChange={val => handleChange(val)}>
          <Radio value={Themes.LIGHT}>
            <Sun color={Colors.SUN_LIGHT} />
            <Spacer x={0.2} />
            Light
          </Radio>
          <Radio value={Themes.DARK}>
            <Moon color={Colors.MOON_DARK} />
            <Spacer x={0.2} />
            Dark
          </Radio>
        </Radio.Group>
      </Card.Content>
    </Card>
  )
}
