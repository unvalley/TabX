import {Card, Divider, Radio, Text} from '@geist-ui/react'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {useRecoilState} from 'recoil'
import {langState} from '../../../store'
import {Lang} from '../../../constants/index'

export const Languages: React.VFC = (props) => {
  const [t, i18n] = useTranslation()
  const [lang, setLang] = useRecoilState(langState)

  const handleChange = (val: React.ReactText) => {
    i18n.changeLanguage(lang)
    setLang(val.toString())
    localStorage.setItem('lang', val.toString())
  }

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
        <Radio.Group value={lang} useRow onChange={(val) => handleChange(val)}>
          <Radio value={Lang.ENGLISH}>English</Radio>
          <Radio value={Lang.JAPANESE}>日本語</Radio>
        </Radio.Group>
      </Card.Content>
    </Card>
  )
}
