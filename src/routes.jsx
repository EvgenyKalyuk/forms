import React from 'react';
import { Route } from 'react-router';
import { MainContainer } from './containers/main';
import { CLIENT_PAGES } from './common/const';

export const routes = () => (
  <Route component={MainContainer}>
    <Route
      path={CLIENT_PAGES.PERSONAL}
      getComponent={(route, cb) =>
        import(/* webpackChunkName: 'personal-form' */'./containers/main/personal-form.jsx') // eslint-disable-line
          .then(page => page.default)
          .then(PersonalPage => cb(null, PersonalPage))
      }
    />
    <Route
      path={CLIENT_PAGES.COMPLETE}
      getComponent={(route, cb) =>
        import(/* webpackChunkName: 'complete-form' */'./containers/main/complete-form.jsx') // eslint-disable-line
          .then(page => page.default)
          .then(CompletePage => cb(null, CompletePage))
      }
    />
    <Route
      path={CLIENT_PAGES.BANK}
      getComponent={(route, cb) =>
        import(/* webpackChunkName: 'bank-form' */'./containers/main/bank-form.jsx') // eslint-disable-line
          .then(page => page.default)
          .then(BankPage => cb(null, BankPage))
      }
    />
  </Route>
);
