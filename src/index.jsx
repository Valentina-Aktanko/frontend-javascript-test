import 'assets/global.scss';

import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { routes } from './routes';

ReactDom.render(
  <BrowserRouter>
    <Switch>
      {routes.map((route, idx) => <Route key={idx} {...route} />)}
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
)