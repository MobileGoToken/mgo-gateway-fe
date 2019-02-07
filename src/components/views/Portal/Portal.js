// @flow

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { THEME_PREFIX, PORTAL_PAGE, INVOICE_PAGE } from 'src/constants';

import Invoice from './Invoice';

const baseClass = `${THEME_PREFIX}-portal`;

// fixing back button when logged out in safari or firefox
window.onpageshow = function(event) {
  if (event.persisted) {
    window.location.reload();
  }
};

const Portal = () => (
  <div className={baseClass}>
    <Switch>
      <Route
        exact
        path={PORTAL_PAGE}
        component={() => <Redirect to={INVOICE_PAGE} />}
      />
      <Route path={`${INVOICE_PAGE}/:data`} component={Invoice} />
      <Route path={INVOICE_PAGE} component={Invoice} />
      <Route path="*" component={() => <Redirect to={INVOICE_PAGE} />} />
    </Switch>
  </div>
);

export default Portal;
