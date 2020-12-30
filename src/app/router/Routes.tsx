import React from 'react'
import {MemoryRouter, Switch, Route} from 'react-router-dom'
// import {Popup} from '../pages/Popup'
import {List} from '../pages/List'
import {Settings} from '../pages/Settings'
import {Masonry} from '../pages/Masonry'
import {Grid, useTheme} from '@geist-ui/react'
import {LeftMenu} from '../components/organisms/LeftMenu'
import styled from 'styled-components'
import {Spacing} from '../constants/styles'
import {useConfigs} from '../utils/config-context'

const Wrapper = styled(Grid.Container)`
  margin: ${Spacing['3']} 100px;
  display: flex;
  min-height: 100vh;
  position: relative;
`

const MainContainer = styled.main`
  margin: ${Spacing['6']} auto;
  max-width: 80%;
  flex: 1 1 0%;
  height: 100%;
  order: 2;
  position: relative;
  flex-direction: column;
  padding-right: 1rem;
  padding-left: 1rem;
`

export const Routes = () => {
  const theme = useTheme()
  const configs: any = useConfigs()
  const isDark = React.useMemo(() => theme.type === 'dark', [theme.type])
  const switchTheme = () => {
    configs.onChange(theme.type === 'dark')
  }

  return (
    <MemoryRouter>
      <Wrapper>
        <LeftMenu />
        <MainContainer>
          <Switch>
            <Route exact path="/" component={List} />
            <Route path="/settings" component={Settings} />
            <Route path="/masonry" component={Masonry} />
          </Switch>
        </MainContainer>
      </Wrapper>
    </MemoryRouter>
  )
}
