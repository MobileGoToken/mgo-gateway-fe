// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import {
  connectRouter,
  routerMiddleware as createRouterMiddleware,
} from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
// import { createLogger } from 'redux-logger';

import rootReducer from './reducer';
import sagas from './saga';
import { StateT } from './state';

const history = createBrowserHistory();

export default (initialState?: StateT) => {
  const sagaMiddleware = createSagaMiddleware();
  const routerMiddleware = createRouterMiddleware(history);
  // const loggerMiddleware = createLogger({ level: 'info', collapsed: true });

  // apply middleware & compose enhancers
  const middleware = [sagaMiddleware, routerMiddleware /* loggerMiddleware */];

  const enhancers = [];
  enhancers.push(applyMiddleware(...middleware));

  // if Redux DevTools extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = composeWithDevTools || compose;
  /* eslint-enable no-underscore-dangle */

  const enhancer = composeEnhancers(...enhancers);
  const connectedReducer = connectRouter(history)(rootReducer);
  const store = createStore(connectedReducer, initialState, enhancer);

  sagaMiddleware.run(sagas);

  return { store, history };
};
