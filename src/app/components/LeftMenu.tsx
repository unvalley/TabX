import React from 'react'
import {Sun} from './icons/sun'
import {Moon} from './icons/moon'

type Props = {
  isDark: boolean
  switchTheme: () => void
}
export const LeftMenu: React.FC<Props> = ({isDark, switchTheme}) => (
  <aside className="">
    <nav>
      <div>
        {isDark && <Sun onClick={switchTheme} />}
        {!isDark && <Moon onClick={switchTheme} />}
      </div>
    </nav>
  </aside>
)
