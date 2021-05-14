import { CssBaseline, GeistProvider } from '@geist-ui/react'
import i18n from 'i18next'
import React, { useEffect } from 'react'
import { initReactI18next } from 'react-i18next'
import { useRecoilValue } from 'recoil'
import { langState } from '~/app/stores/lang'
import enJson from './locales/en.json'
import jaJson from './locales/ja.json'
import { Routes } from './router/Routes'
// import { store } from './stores'
import { colorThemeState } from './stores/colorTheme'

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

  useEffect(() => {
    i18n.changeLanguage(lang)
  }, [lang, i18n])

  return (
    // <Provider store={store}>
    <GeistProvider themeType={colorTheme}>
      <CssBaseline />
      <Routes />
    </GeistProvider>
    // </Provider>
  )
}
