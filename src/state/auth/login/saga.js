// @flow

import { all, takeEvery, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { validateMnemonic } from 'bip39';

import http from 'src/services/http';
import { INVOICE_PAGE } from 'src/constants';

import * as actions from './actions';

export function* location$(): Generator<*, *, *> {
  try {
    const { data } = yield http.get('https://ipinfo.io/json');
    yield put(actions.locationSuccess(data.country.toLowerCase()));
  } catch (err) {
    // console.log(err);
  }
}

export function* login$({ payload }): Generator<*, *, *> {
  const mnemonic = Object.values(payload)
    .map(item => item.trim())
    .join(' ');

  if (!validateMnemonic(mnemonic)) {
    yield put(actions.loginFail());
  } else {
    yield put(actions.loginSuccess(mnemonic));
    yield put(push(INVOICE_PAGE));
  }
}

// $FlowIssue
export default function*() {
  yield all([takeEvery(actions.LOGIN, login$)]);
  yield all([takeEvery(actions.LOCATION, location$)]);
}
