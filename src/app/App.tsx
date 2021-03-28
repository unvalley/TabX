import { CssBaseline, GeistProvider, Themes } from '@geist-ui/react'
import i18n from 'i18next'
import * as React from 'react'
import { initReactI18next } from 'react-i18next'
import { useRecoilValue } from 'recoil'
import { langState } from '~/app/store/lang'
import enJson from './locales/en.json'
import jaJson from './locales/ja.json'
import { Routes } from './router/Routes'
import { colorThemeState } from './store'

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
  interpolation: { escapeValue: false },
  returnEmptyString: false,
})

export const App = () => {
  const colorTheme = useRecoilValue(colorThemeState)
  const lang = useRecoilValue(langState)

  const customDarkTheme = Themes.createFromDark({
    type: 'customDark',
    palette: {
      background: '#181a1b',
    },
  })

  const customLightTheme = Themes.createFromLight({
    type: 'customLight',
  })

  React.useEffect(() => {
    i18n.changeLanguage(lang)
  }, [lang, i18n])

  return (
    <GeistProvider themes={[customLightTheme, customDarkTheme]} themeType={colorTheme}>
      <CssBaseline />
      <Routes />
    </GeistProvider>
  )
}
