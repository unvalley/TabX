import {Card, Divider, Radio, Text} from '@geist-ui/react'
import React from 'react'
import {useTranslation} from 'react-i18next'

export const Languages: React.VFC = (props) => {
  const [lang, setLang] = React.useState('')
  const [t, i18n] = useTranslation()

  React.useEffect(() => {
    i18n.changeLanguage(lang)
  }, [lang, i18n])

  return (
    <Card>
      <Card.Content>
        <Text h4>{t('LANGUAGE')}</Text>
        <Text>
          {t('CURRENT_LANGUAGE')} {lang}
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
