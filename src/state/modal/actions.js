// @flow

import { createAction } from 'redux-actions';

export const SHOW_MODAL = '[MODAL] Show';
export const showModal = createAction(SHOW_MODAL);

export const HIDE_MODAL = '[MODAL] Hide';
export const hideModal = createAction(HIDE_MODAL);
