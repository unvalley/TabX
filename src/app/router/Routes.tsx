import { Grid, useTheme } from '@geist-ui/react'
import React from 'react'
import { MemoryRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { Load } from '../components/atoms/Load'
import { LeftMenu } from '../components/organisms/LeftMenu'
import { Spacing } from '../constants/styles'
import { List } from '../pages/List'
import { Masonry } from '../pages/Masonry'
import { Settings } from '../pages/Settings'
import { Domain } from '../pages/Domain'

const Wrapper = styled(Grid.Container)<{ bgColor: string }>`
  margin: ${Spacing['3']} 100px;
  display: flex;
  min-height: 100vh;
  position: relative;
  background-color: ${({ bgColor }) => bgColor};
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
`

export const Routes = () => {
  const theme = useTheme()
  const mainBgColor = theme.type === 'dark' ? theme.palette.background : '#f2f4fb'

  return (
    <MemoryRouter>
      <Wrapper bgColor={mainBgColor}>
        <Grid lg={1} md={1} xs={4}>
          <LeftMenu />
        </Grid>
        <Grid lg={23} md={23} xs={20}>
          <MainContainer>
            <React.Suspense fallback={<Load />}>
              <Switch>
                <Route exact path="/" component={List} />
                <Route path="/masonry" component={Masonry} />
                <Route path="/settings" component={Settings} />
                <Route path="/domain" component={Domain} />
              </Switch>
            </React.Suspense>
          </MainContainer>
        </Grid>
      </Wrapper>
    </MemoryRouter>
  )
}
