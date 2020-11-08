import * as React from 'react'
import {Routes} from './router/Routes'
import {RecoilRoot} from 'recoil'
import {GeistProvider, CssBaseline} from '@geist-ui/react'
import {ThemeConfigProvider} from './utils/theme-config-provider'

export const App = () => {
  const [themeType, setThemeType] = React.useState('light')
  const changeHandle = React.useCallback((isDark) => {
    const next = isDark ? 'light' : 'dark'
    setThemeType(next)
  }, [])

  React.useEffect(() => {
    if (typeof localStorage !== 'object') return null
    const localType = localStorage.getItem('theme')
    if (!localType) return null
    if (!['light', 'dark'].includes(localType)) return null
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
