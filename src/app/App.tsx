import {CssBaseline, GeistProvider} from '@geist-ui/react'
import i18n from 'i18next'
import * as React from 'react'
import {initReactI18next} from 'react-i18next'
import {useRecoilValue} from 'recoil'
import enJson from './locales/en.json'
import jaJson from './locales/ja.json'
import {Routes} from './router/Routes'
import {colorThemeState, langState} from './store'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enJson,
    },
    ja: {
      translation: jaJson,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {escapeValue: false},
  returnEmptyString: false,
})

export const App = () => {
  const colorTheme = useRecoilValue(colorThemeState)
  const lang = useRecoilValue(langState)

  React.useEffect(() => {
    i18n.changeLanguage(lang)
  }, [lang, i18n])

  return (
    <GeistProvider theme={{type: colorTheme}}>
      <CssBaseline />
      <Routes />
    </GeistProvider>
  )
}
