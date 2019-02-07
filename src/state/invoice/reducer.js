// @flow

import { handleActions } from 'redux-actions';

import * as actions from './actions';
import initialState from './state';

export default handleActions(
  new Map([
    [
      actions.ADDRESSES,
      state => ({
        ...state,
        inProgress: true,
      }),
    ],
    [
      actions.ADDRESSES_FAIL,
      (state, { payload }) => ({
        ...state,
        inProgress: false,
        fail: true,
        ...(payload && payload.message ? { error: payload.message } : {}),
      }),
    ],
    [
      actions.ADDRESSES_SUCCESS,
      (state, { payload }) => ({
        ...state,
        account: payload,
        inProgress: false,
        fail: false,
      }),
    ],
    [
      actions.PAYMENT,
      state => ({
        ...state,
        paymentInProgress: true,
      }),
    ],
    [
      actions.PAYMENT_FAIL,
      state => ({
        ...state,
        paymentInProgress: false,
        fail: true,
      }),
    ],
    [
      actions.PAYMENT_SUCCESS,
      state => ({
        ...state,
        token: '',
        paymentInProgress: false,
        fail: false,
      }),
    ],
    [
      actions.XSOLLA_DATA,
      state => ({
        ...state,
        xsollaData: [],
        inProgress: true,
      }),
    ],
    [
      actions.TOKEN,
      state => ({
        ...state,
      }),
    ],
    [
      actions.TOKEN_SUCCESS,
      (state, { payload }) => ({
        ...state,
        token: payload,
      }),
    ],
    [
      actions.TOKEN_CLEAR,
      state => ({
        ...state,
        token: '',
      }),
    ],
  ]),
  { ...initialState },
);
