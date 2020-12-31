import * as React from 'react'
import {Routes} from './router/Routes'
import {GeistProvider, CssBaseline} from '@geist-ui/react'
import {ThemeConfigProvider} from './utils/theme-config-provider'
import {useSetRecoilState} from 'recoil'
import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import enJson from './locales/en.json'
import jaJson from './locales/ja.json'
import {getAllTabLists} from '../shared/storage'
import {TabLists} from '../shared/typings'
import {sortTabListsState} from './store'

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
  const setTabLists = useSetRecoilState<TabLists>(sortTabListsState)
  const [themeType, setThemeType] = React.useState('dark')

  React.useEffect(() => {
    const cleanup = async () => {
      const lists = await getAllTabLists()
      setTabLists(lists)
    }
    cleanup()
  }, [])

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
    <GeistProvider theme={{...myTheme, type: themeType}}>
      <CssBaseline />
      <ThemeConfigProvider onChange={changeHandle}>
        <Routes />
      </ThemeConfigProvider>
    </GeistProvider>
  )
}
