import React from 'react'
import {MemoryRouter, Switch, Route} from 'react-router-dom'
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
  display: flex;
  background-color: #f2f5ff;
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
      <Container>
        <LeftMenu isDark={isDark} switchTheme={switchTheme} />

        <main
          style={{
            margin: `${Spacing['6']} auto`,
            maxWidth: '80%',
            flex: '1 1 0%',
            height: '100%',
            order: 2,
            position: 'relative',
            flexDirection: 'column',
            paddingRight: '1rem',
            paddingLeft: '1rem',
          }}
        >
          <Switch>
            <Route exact path="/" component={List} />
            <Route path="/settings" component={Settings} />
            <Route path="/masonry" component={Masonry} />
          </Switch>
        </main>
      </Container>
    </MemoryRouter>
  )
}
