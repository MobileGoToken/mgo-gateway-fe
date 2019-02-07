// @flow

import { all } from 'redux-saga/effects';

import authSaga from './auth/saga';
import invoiceSaga from './invoice/saga';

// $FlowIssue
export default function*() {
  yield all([authSaga(), invoiceSaga()]);
}
