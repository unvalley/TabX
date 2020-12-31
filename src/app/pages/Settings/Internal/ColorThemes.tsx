import {Card, Code, Divider, Radio, Spacer, Text, Toggle} from '@geist-ui/react'
import {Sun} from '@geist-ui/react-icons'
import {Moon} from '@geist-ui/react-icons'

import React from 'react'

import {useTranslation} from 'react-i18next'
import {Colors} from '../../../constants/styles'

type Props = {}
export const ColorThemes: React.VFC<Props> = (props) => {
  const [t, i18n] = useTranslation()

  const handleChange = (val: React.ReactText) => {
    const localType = localStorage.getItem('theme')
    if (localType === null) return
    const next = localType === 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme', next)
  }

  return (
    <Card>
      <Card.Content>
        <Text h4>{t('COLOR_THEMES')}</Text>
      </Card.Content>

      <Divider y={0} />

      <Card.Content>
        <Radio.Group value="1" useRow onChange={(val) => handleChange(val)}>
          <Radio value="1">
            <Sun color={Colors.SUN_LIGHT} />
            <Spacer x={0.5} />
            Light
          </Radio>
          <Radio value="2">
            <Moon color={Colors.MOON_DARK} />
            <Spacer x={0.5} />
            Dark
          </Radio>
        </Radio.Group>
      </Card.Content>
    </Card>
  )
}
