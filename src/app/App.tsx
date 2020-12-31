import * as React from 'react'
import {Routes} from './router/Routes'
import {GeistProvider, CssBaseline, GeistUIThemes} from '@geist-ui/react'
import {ThemeConfigProvider} from './utils/theme-config-provider'
import {RecoilRoot} from 'recoil'
import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import enJson from './locales/en.json'
import jaJson from './locales/ja.json'

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

const myTheme = {
  pallete: {
    background: '#eeb',
  },
}

export const App = () => {
  const [themeType, setThemeType] = React.useState('dark')
  const changeHandle = React.useCallback((last: string) => {
    const next = last === 'dark' ? 'light' : 'dark'
    setThemeType(next)
  }, [])

  React.useEffect(() => {
    const localType = localStorage.getItem('theme')
    if (localType === null) return
    setThemeType(localType)
  }, [])

  React.useEffect(() => {
    localStorage.setItem('theme', themeType)
  }, [themeType])

  return (
    <RecoilRoot>
      <GeistProvider theme={{...myTheme, type: themeType}}>
        <CssBaseline />
        <ThemeConfigProvider onChange={changeHandle}>
          <Routes />
        </ThemeConfigProvider>
      </GeistProvider>
    </RecoilRoot>
  )
}
