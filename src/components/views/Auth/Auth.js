// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AUTH_PAGE, THEME_PREFIX } from 'src/constants';

import Login from './Login';

const baseClass = `${THEME_PREFIX}-auth`;

const Auth = () => (
  <div className={baseClass}>
    <Switch>
      <Route path={AUTH_PAGE} component={Login} />
    </Switch>
  </div>
);

export default Auth;
