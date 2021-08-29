import { atom, selector } from 'recoil'

import { Themes } from '../constants/styles'

const isSystemColorDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

export const colorThemeState = atom<string>({
  key: 'colorThemeState',
  default: selector({
    key: 'colorThemeState/default',
    get: () => {
      const theme = localStorage.getItem('theme')
      if (theme === null) return isSystemColorDark ? Themes.DARK : Themes.LIGHT
      return theme
    },
  }),
})
