// @flow

import { all } from 'redux-saga/effects';

import loginSaga from './login/saga';

// $FlowIssue
export default function*() {
  yield all([loginSaga()]);
}
