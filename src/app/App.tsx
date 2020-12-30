import * as React from 'react'
import {Routes} from './router/Routes'
import {GeistProvider, CssBaseline} from '@geist-ui/react'
import {ThemeConfigProvider} from './utils/theme-config-provider'
import {RecoilRoot} from 'recoil'
import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        Language: 'Language',
      },
    },
    ja: {
      translation: {
        Language: '言語',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {escapeValue: false},
})

export const App = () => {
  const [themeType, setThemeType] = React.useState('dark')
  const changeHandle = React.useCallback((isDark: any) => {
    const next = isDark ? 'light' : 'dark'
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
      <GeistProvider theme={{type: themeType}}>
        <CssBaseline />
        <ThemeConfigProvider onChange={changeHandle}>
          <Routes />
        </ThemeConfigProvider>
      </GeistProvider>
    </RecoilRoot>
  )
}
