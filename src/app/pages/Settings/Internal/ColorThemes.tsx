import {Card, Code, Divider, Radio, Spacer, Text, Toggle} from '@geist-ui/react'
import {Sun} from '@geist-ui/react-icons'
import {Moon} from '@geist-ui/react-icons'

import React from 'react'

import {useTranslation} from 'react-i18next'
import {Colors} from '../../../constants/styles'

type Props = {switchTheme: () => void; isDark: boolean}
export const ColorThemes: React.VFC<Props> = (props) => {
  const [t, i18n] = useTranslation()

  return (
    <Card>
      <Card.Content>
        <Text h4>{t('COLOR_THEMES')}</Text>
      </Card.Content>

      <Divider y={0} />

      <Card.Content>
        <Radio.Group value="1" useRow onChange={props.switchTheme}>
          <Radio value="1">
            <Sun color={Colors.SUN_LIGHT} />
            <Spacer x={0.5} />
            {t('LIGHT')}
          </Radio>
          <Radio value="2">
            <Moon color={Colors.MOON_DARK} />
            <Spacer x={0.5} />
            {t('DARK')}
          </Radio>
        </Radio.Group>
      </Card.Content>
    </Card>
  )
}
