import { IO } from 'fp-ts/lib/IO'

import { APP_NAME } from '~/core/shared/constants'
import { Themes } from '~/ui/constants/styles'

export const getNowYMD: IO<string> = () => {
  const dt = new Date()
  const y = dt.getFullYear()
  const m = ('00' + (dt.getMonth() + 1)).slice(-2)
  const d = ('00' + dt.getDate()).slice(-2)
  return y + m + d
}

export const exportedJSONFileName = `${APP_NAME}_${getNowYMD()}.json`
export const isDark = (themeType: string) => themeType === Themes.DARK
