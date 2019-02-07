import AuthState from './auth/state';
import ModalState from './modal/initialState';
import InvoiceState from './invoice/state';

export type StateT = {
  auth: AuthState,
  modal: ModalState,
  invoice: InvoiceState,
};
