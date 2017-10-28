import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';

import store from './store';
import { routes } from './routes';

import './styles/index.styl';

hydrate(
  <Provider store={store()}>
    <Router history={browserHistory} routes={routes()} />
  </Provider>,
  document.getElementById('root'), // eslint-disable-line
);