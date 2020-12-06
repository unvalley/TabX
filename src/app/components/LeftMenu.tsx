import React from 'react'
import {Sun} from './icons/sun'
import {Moon} from './icons/moon'
import {Github, Settings, AlignJustify, Grid} from '@geist-ui/react-icons'
import {Spacing} from '../constants/styles'

type Props = {
  isDark: boolean
  switchTheme: () => void
}

export const LeftMenu: React.FC<Props> = ({isDark, switchTheme}) => (
  <aside className="" style={{padding: `${Spacing['0']} ${Spacing['1']}`}}>
    <nav style={{display: 'flex', flexDirection: 'column', flexWrap: 'nowrap'}}>
      <span
        style={{
          backgroundColor: 'blue',
          borderRadius: `${Spacing['3']}`,
          outline: '2px solid transparent',
          outlineOffset: '2px',
          justifyContent: 'center',
          flexShrink: 0,
          padding: '1rem',
          margin: `${Spacing['0.5']} ${Spacing['0']}`,
          display: 'inline-flex',
        }}
      >
        <Github style={{lineHeight: '1.5rem'}} />
      </span>
      <span
        style={{
          backgroundColor: 'blue',
          borderRadius: `${Spacing['3']}`,
          outline: '2px solid transparent',
          outlineOffset: '2px',
          justifyContent: 'center',
          flexShrink: 0,
          padding: '1rem',
          margin: `${Spacing['0.5']} ${Spacing['0']}`,
          display: 'inline-flex',
        }}
      >
        <AlignJustify style={{lineHeight: '1.5rem'}} />
      </span>

      <span
        style={{
          backgroundColor: 'blue',
          borderRadius: '16px',
          outline: '2px solid transparent',
          outlineOffset: '2px',
          justifyContent: 'center',
          flexShrink: 0,
          padding: '1rem',
          margin: '4px 0px',
          display: 'inline-flex',
        }}
      >
        <Grid />
      </span>
      <span
        style={{
          backgroundColor: 'blue',
          borderRadius: '16px',
          outline: '2px solid transparent',
          outlineOffset: '2px',
          justifyContent: 'center',
          flexShrink: 0,
          padding: '1rem',
          margin: '4px 0px',
          display: 'inline-flex',
        }}
      >
        <Settings />
      </span>
      {isDark && <Sun onClick={switchTheme} />}
      {!isDark && <Moon onClick={switchTheme} />}
    </nav>
  </aside>
)
