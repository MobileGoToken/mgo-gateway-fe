// @flow
/* eslint global-require: 0 */

import { testReducer } from 'src/testUtils';
import * as actions from './actions';

beforeEach(() => {
  jest.resetModules();
});

testReducer({
  testName: 'Login Reducer',
  getReducer: () => require('./reducer').default,
  getState: () => require('./initialState').default,
  expectedActions: {
    [actions.LOGIN]: {
      expectedStateDiff: {
        inProgress: true,
      },
    },
    [actions.LOGIN_FAIL]: {
      expectedStateDiff: {
        inProgress: false,
        fail: true,
      },
    },
  },
});
