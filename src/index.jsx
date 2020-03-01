import 'assets/global.scss';

import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';

import { routes } from './routes';

ReactDom.render(
  <HashRouter>
    <Switch>
      {routes.map((route, idx) => <Route key={idx} {...route} />)}
    </Switch>
  </HashRouter>,
  document.getElementById('root'),
)