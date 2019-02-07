import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { IntlProvider } from 'src/components/wrappers/IntlProvider';
import { AUTH_PAGE, PORTAL_PAGE, THEME_PREFIX } from 'src/constants';
import { StateT } from 'src/state/state';

import Auth from './views/Auth';
import Portal from './views/Portal';

const baseClass = `${THEME_PREFIX}-app`;

const App = ({ store, history }: { store: StateT, history: Object }) => (
  <Provider store={store}>
    <IntlProvider>
      <ConnectedRouter history={history}>
        <div className={baseClass}>
          <Switch className={`${baseClass}__content`}>
            <Route
              exact
              path="/"
              component={() => <Redirect to={AUTH_PAGE} />}
            />
            <Route path={PORTAL_PAGE} component={Portal} />
            <Route path={AUTH_PAGE} component={Auth} />
          </Switch>
        </div>
      </ConnectedRouter>
    </IntlProvider>
  </Provider>
);
export default App;
