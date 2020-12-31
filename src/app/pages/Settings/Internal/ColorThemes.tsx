import {Card, Code, Divider, Radio, Spacer, Text, Toggle} from '@geist-ui/react'
import {Sun} from '@geist-ui/react-icons'
import {Moon} from '@geist-ui/react-icons'

import React from 'react'

import {useTranslation} from 'react-i18next'
import {useRecoilState} from 'recoil'
import {Colors} from '../../../constants/styles'
import {colorThemeState} from '../../../store'

type Props = {}
export const ColorThemes: React.VFC<Props> = (props) => {
  const [t, i18n] = useTranslation()
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

      <Divider y={0} />

      <Card.Content>
        <Radio.Group
          value={colorTheme}
          useRow
          onChange={(val) => handleChange(val)}
        >
          <Radio value="light">
            <Sun color={Colors.SUN_LIGHT} />
            <Spacer x={0.2} />
            Light
          </Radio>
          <Radio value="dark">
            <Moon color={Colors.MOON_DARK} />
            <Spacer x={0.2} />
            Dark
          </Radio>
        </Radio.Group>
      </Card.Content>
    </Card>
  )
}
