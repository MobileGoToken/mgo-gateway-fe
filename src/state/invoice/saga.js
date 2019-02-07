// @flow

import { all, takeEvery, put, call } from 'redux-saga/effects';
import { mnemonicToSeed } from 'bip39';
import { fromMasterSeed } from 'ethereumjs-wallet/hdkey';
import Web3 from 'web3';
import Tx from 'ethereumjs-tx';

import http from 'src/services/http';
import { TOKEN_ADDRESS, TRANSFER_ABI } from 'src/constants';

import * as actions from './actions';

const web3 = new Web3();

const contract = new web3.eth.Contract(TRANSFER_ABI);
function* sendTransaction(data, payload, account, total) {
  const transaction = {
    from: account.getAddressString(),
    to: TOKEN_ADDRESS,
    gas: web3.utils.toHex(data.estimatedGas),
    nonce: web3.utils.toHex(data.nonce),
    gasPrice: web3.utils.toHex(data.gasPrice),
    data: yield contract.methods
      .transfer(payload.payment.address, total)
      .encodeABI(),
  };

  const tx = new Tx(transaction);
  tx.sign(account.getPrivateKey());
  const serializedTx = tx.serialize();

  transaction.v = `0x${tx.v.toString('hex')}`;
  transaction.r = `0x${tx.r.toString('hex')}`;
  transaction.s = `0x${tx.s.toString('hex')}`;
  transaction.rawTransaction = `0x${serializedTx.toString('hex')}`;

  try {
    const { status } = yield http.post(
      'user/transaction',
      {
        transaction,
        payload: payload.payment,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${payload.token}`,
        },
      },
    );
    if (status === 201) {
      yield put(actions.paymentSuccess());
    } else {
      yield put(actions.paymentFail());
    }
  } catch ({ response }) {
    // console.log(response);
  }
}
export function* fetchAddresses$({ payload }): Generator<*, *, *> {
  try {
    let { num } = payload;
    num = num < 5 ? 5 : num > 15 ? 15 : num;

    const seed = mnemonicToSeed(payload.mnemonic);
    const masterPKey = fromMasterSeed(seed);

    const addresses = [];

    for (let i = 0; i < num; i += 1) {
      const address = masterPKey.derivePath(`m/44'/60'/0'/0/${i}`).getWallet();
      yield addresses.push(address.getAddressString());
    }

    const { data } = yield http.post(
      'user/balance',
      { addresses },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    yield put(actions.fetchAddressesSuccess(data));
  } catch ({ response }) {
    // console.log(response);
    yield put(actions.fetchAddressesFail());
  }
}

export function* payment$({ payload }): Generator<*, *, *> {
  const total =
    payload.payment.items.map(x => x.price).reduce((a, b) => a + b, 0) *
    10 ** 8;
  const seed = mnemonicToSeed(payload.mnemonic);
  const masterPKey = fromMasterSeed(seed);
  const account = masterPKey
    .derivePath(`m/44'/60'/0'/0/${payload.address}`)
    .getWallet();

  try {
    const { data } = yield http.get(
      'user/transaction-data',
      {
        from: account.getAddressString(),
        to: payload.payment.address,
        amount: total,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    yield call(sendTransaction, data, payload, account, total);
  } catch ({ response }) {
    // console.log(response);
    yield put(actions.PAYMENT_FAIL);
  }
}

export function* fetchXsollaData$({ payload: { data } }): Generator<*, *, *> {
  try {
    if (data) {
      yield put(actions.fetchXsollaData(JSON.parse(atob(data))));
    }
  } catch (err) {
    // console.log(err);
  }
}

export function* fetchToken$({ payload }): Generator<*, *, *> {
  try {
    if (payload) {
      yield put(actions.fetchTokenSuccess(payload));
    }
  } catch (err) {
    // console.log(err);
  }
}

// $FlowIssue
export default function*() {
  yield all([takeEvery(actions.ADDRESSES, fetchAddresses$)]);
  yield all([takeEvery(actions.PAYMENT, payment$)]);
  yield all([takeEvery(actions.XSOLLA_DATA, fetchXsollaData$)]);
  yield all([takeEvery(actions.TOKEN, fetchToken$)]);
}
