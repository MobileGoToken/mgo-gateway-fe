// @flow

import * as actions from './actions';
import initialState from './initialState';

export default (state: * = initialState(), action: any) => {
  const { payload, type } = action;

  switch (type) {
    case actions.SHOW_MODAL: {
      return {
        ...state,
        ...payload,
      };
    }
    case actions.HIDE_MODAL:
      return { ...initialState() };
    default:
      return state;
  }
};
