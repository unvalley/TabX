import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
// import {Popup} from '../pages/Popup'
import {List} from '../pages/List'
import {Settings} from '../pages/Settings'
import {Masonry} from '../pages/Masonry'
import {Grid, useTheme} from '@geist-ui/react'
import {LeftMenu} from '../components/LeftMenu'
import styled from 'styled-components'
import {Spacing} from '../constants/styles'
import {useConfigs} from '../utils/config-context'

const Container = styled(Grid.Container)`
  justify: center;
  margin: ${Spacing['3']} 200px;
`
export const Routes = () => {
  const theme = useTheme()
  const configs: any = useConfigs()
  const isDark = React.useMemo(() => theme.type === 'dark', [theme.type])
  const switchTheme = () => {
    configs.onChange(theme.type === 'dark')
  }

  return (
    <BrowserRouter>
      <Switch>
        <Container>
          <LeftMenu isDark={isDark} switchTheme={switchTheme} />

          <Route exact path="/" component={List} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/masonry" component={Masonry} />
        </Container>
      </Switch>
    </BrowserRouter>
  )
}
