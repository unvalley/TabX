import { useTheme } from '@geist-ui/react'
import React from 'react'

import { Spacing, Themes } from '~/ui/constants/styles'

import { Load } from '../Load'
import { ContentWrapper, MainContainer } from './style'

export const Layout: React.FC = props => {
  const theme = useTheme()
  const mainBgColor = theme.type === Themes.DARK ? theme.palette.background : '#f2f4fb'

  return (
    <React.Suspense
      fallback={
        <div style={{ margin: `${Spacing[5]} auto` }}>
          <Load />
        </div>
      }
    >
      <ContentWrapper bg={mainBgColor}>
        <MainContainer>{props.children}</MainContainer>
      </ContentWrapper>
    </React.Suspense>
  )
}
