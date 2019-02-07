import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './auth/reducer';
import modal from './modal/reducer';
import invoice from './invoice/reducer';

export default combineReducers({
  auth,
  invoice,
  form,
  modal,
});
