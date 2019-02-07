// @flow

import { createAction } from 'redux-actions';

export const ADDRESSES = '[INVOICE] Addresses encrypt';
export const ADDRESSES_SUCCESS = `${ADDRESSES} success`;
export const ADDRESSES_FAIL = `${ADDRESSES} fail`;

export const fetchAddresses = createAction(ADDRESSES);
export const fetchAddressesSuccess = createAction(ADDRESSES_SUCCESS);
export const fetchAddressesFail = createAction(ADDRESSES_FAIL);

export const PAYMENT = '[INVOICE] Payment';
export const PAYMENT_SUCCESS = `${PAYMENT} success`;
export const PAYMENT_FAIL = `${PAYMENT} fail`;

export const payment = createAction(PAYMENT);
export const paymentSuccess = createAction(PAYMENT_SUCCESS);
export const paymentFail = createAction(PAYMENT_FAIL);

export const XSOLLA_DATA = '[XSOLLA] fetch';
export const XSOLLA_DATA_SUCCESS = `${XSOLLA_DATA} success`;
export const XSOLLA_DATA_FAIL = `${XSOLLA_DATA} fail`;

export const fetchXsollaData = createAction(XSOLLA_DATA);
export const fetchXsollaDataSuccess = createAction(XSOLLA_DATA_SUCCESS);
export const fetchXsollaDataFail = createAction(XSOLLA_DATA_FAIL);

export const TOKEN = '[TOKEN] fetch';
export const TOKEN_SUCCESS = `${TOKEN} fetch success`;
export const TOKEN_CLEAR = `${TOKEN} clear`;

export const fetchToken = createAction(TOKEN);
export const fetchTokenSuccess = createAction(TOKEN_SUCCESS);
export const fetchTokenClear = createAction(TOKEN_CLEAR);
