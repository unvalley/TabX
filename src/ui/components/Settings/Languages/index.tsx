import { Card, Divider, Radio, Text } from '@geist-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'

import { Lang } from '~/ui/constants'
import { langState } from '~/ui/stores/lang'

export const Languages: React.VFC<{ backgroundColor?: string }> = ({ backgroundColor }) => {
  const [t, i18n] = useTranslation()
  const [lang, setLang] = useRecoilState(langState)

  const handleChange = (val: React.ReactText) => {
    i18n.changeLanguage(lang)
    setLang(val.toString())
    localStorage.setItem('lang', val.toString())
  }

  return (
    <Card style={{ backgroundColor: backgroundColor }}>
      <Card.Content>
        <Text h4>{t('LANGUAGE')}</Text>
      </Card.Content>
      <Divider y={0} />
      <Card.Content>
        <Radio.Group id="select-color-theme" value={lang} useRow onChange={val => handleChange(val)}>
          <Radio value={Lang.ENGLISH}>English</Radio>
          <Radio value={Lang.JAPANESE}>日本語</Radio>
        </Radio.Group>
      </Card.Content>
    </Card>
  )
}
