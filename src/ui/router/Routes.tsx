import { Grid, useTheme } from '@geist-ui/react'
import React from 'react'
import { MemoryRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'

import { Load } from '~/ui/components/Load'
import { Spacing, Themes } from '~/ui/constants/styles'

import { List } from '../pages/List'
import { Settings } from '../pages/Settings'

const Wrapper = styled(Grid.Container)<{ bg: string }>`
  margin: ${Spacing['3']} 100px;
  display: flex;
  min-height: 100vh;
  position: relative;
  background-color: ${({ bg }) => bg};
`

const MainContainer = styled.main`
  margin: ${Spacing['5']} auto;
  max-width: 65%;
  flex: 1 1 0%;
  order: 2;
  position: relative;
  flex-direction: column;
  padding-right: 1rem;
  padding-left: 1rem;
  padding-bottom: 8rem;
`

export const Routes = () => {
  const theme = useTheme()
  const mainBgColor = theme.type === Themes.DARK ? theme.palette.background : '#f2f4fb'

  return (
    <MemoryRouter>
      <Wrapper bg={mainBgColor}>
        <Grid lg={24} md={24} xs={24}>
          <MainContainer>
            <React.Suspense fallback={<Load />}>
              <Switch>
                <Route exact path="/" component={List} />
                <Route path="/settings" component={Settings} />
              </Switch>
            </React.Suspense>
          </MainContainer>
        </Grid>
      </Wrapper>
    </MemoryRouter>
  )
}
