import {Card, Divider, Text} from '@geist-ui/react'
import React from 'react'
import {useTranslation} from 'react-i18next'

type Props = {}
export const ColorThemes: React.VFC<Props> = (props) => {
  const [t, i18n] = useTranslation()

  return (
    <Card>
      <Card.Content>
        <Text h4>{t('COLOR_THEMES')}</Text>
      </Card.Content>
      <Divider y={0} />
      <Card.Content>
        <Text>Setting Theme: WIP</Text>
      </Card.Content>
    </Card>
  )
}
