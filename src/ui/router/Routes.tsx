import React from 'react'
import { MemoryRouter, Route, Switch } from 'react-router-dom'

import { ContentLayout } from '../components/Layout'
import { List } from '../pages/List'
import { Settings } from '../pages/Settings'

export const Routes = () => {
  return (
    <MemoryRouter>
      <Switch>
        <ContentLayout>
          <Route exact path="/" component={List} />
          <Route path="/settings" component={Settings} />
        </ContentLayout>
      </Switch>
    </MemoryRouter>
  )
}
