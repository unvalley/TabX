import { Layout } from '@geist-ui/react-icons'
import React from 'react'
import { MemoryRouter, Route, Switch } from 'react-router-dom'

import { List } from '../pages/List'
import { Settings } from '../pages/Settings'

export const Routes = () => {
  return (
    <MemoryRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={List} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </Layout>
    </MemoryRouter>
  )
}
