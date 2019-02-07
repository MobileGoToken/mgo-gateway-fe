// @flow

import { handleActions } from 'redux-actions';

import * as actions from './actions';
import initialState from './state';

export default handleActions(
  new Map([
    [
      actions.LOGIN,
      state => ({
        ...state,
        inProgress: true,
      }),
    ],
    [
      actions.LOGIN_FAIL,
      (state, { payload }) => ({
        ...state,
        inProgress: false,
        fail: true,
        ...(payload && payload.message ? { error: payload.message } : {}),
      }),
    ],
    [
      actions.LOGIN_SUCCESS,
      (state, { payload }) => ({
        ...state,
        mnemonic: payload,
        inProgress: false,
        fail: false,
      }),
    ],
    [
      actions.LOCATION,
      state => ({
        ...state,
        inProgress: true,
      }),
    ],
    [
      actions.LOCATION_SUCCESS,
      (state, { payload }) => ({
        ...state,
        country: payload,
        inProgress: false,
        fail: false,
      }),
    ],
    [
      actions.CLEAR_LOGIN_STATE,
      () => ({
        ...initialState,
      }),
    ],
  ]),
  { ...initialState },
);
