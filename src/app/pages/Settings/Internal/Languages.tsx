import {Card, Divider, Radio, Text} from '@geist-ui/react'
import React from 'react'
import i18n from 'i18next'
import {useTranslation} from 'react-i18next'

export const Languages: React.VFC = (props) => {
  const [lang, setLang] = React.useState('')
  const [t, i18n] = useTranslation()

  React.useEffect(() => {
    i18n.changeLanguage(lang)
  }, [lang, i18n])

  return (
    <Card style={{margin: '20px 0px'}}>
      <Card.Content>
        <Text h4>{t('Language')}</Text>
        <Text>
          {t('Current Language:')} {lang}
        </Text>
      </Card.Content>
      <Divider y={0} />
      <Card.Content>
        <Radio.Group value="1" useRow>
          <Radio value="1" onClick={() => setLang('en')}>
            English
          </Radio>
          <Radio value="2" onClick={() => setLang('ja')}>
            日本語
          </Radio>
        </Radio.Group>
      </Card.Content>
    </Card>
  )
}
