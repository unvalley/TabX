import * as React from 'react'
import {Routes} from './router/Routes'
import {GeistProvider, CssBaseline} from '@geist-ui/react'
import {useRecoilValue, useSetRecoilState} from 'recoil'
import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import enJson from './locales/en.json'
import jaJson from './locales/ja.json'
import {getAllTabLists} from '../shared/storage'
import {TabLists} from '../shared/typings'
import {colorThemeState, sortTabListsState} from './store'

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
  const colorTheme = useRecoilValue(colorThemeState)

  React.useEffect(() => {
    const cleanup = async () => {
      const lists = await getAllTabLists()
      setTabLists(lists)
    }
    cleanup()
  }, [])

  return (
    <GeistProvider theme={{...myTheme, type: colorTheme}}>
      <CssBaseline />
      <Routes />
    </GeistProvider>
  )
}
