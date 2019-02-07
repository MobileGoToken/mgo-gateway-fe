// @flow

export type StateT = {
  inProgress: boolean,
  fail: boolean,
  error: string | null,
};

const initialState: StateT = {
  inProgress: false,
  fail: false,
  account: null,
  error: null,
};

export default initialState;
