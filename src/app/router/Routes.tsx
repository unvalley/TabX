import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {Popup} from '../pages/Popup'
import {List} from '../pages/List'

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={List} />
      {/* <Route path="/popup" component={Popup} /> */}
    </Switch>
  </BrowserRouter>
)
