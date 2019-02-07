// @flow
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router';

import withConfigSizes from '@wrappers/withConfigSizes';
import {
  getLoginMnemonic,
  getAccounts,
  getXsollaData,
  getToken,
  isPaymentInProgress,
} from 'src/state/selectors';

import {
  fetchAddresses,
  payment,
  fetchXsollaData,
  fetchToken,
  fetchTokenClear,
} from 'src/state/actions';

import messages from './messages';
import Dashboard from './Invoice';

const actions = {
  fetchAddresses,
  payment,
  fetchXsollaData,
  fetchToken,
  fetchTokenClear,
};

const mapStateToProps = state => ({
  ...getLoginMnemonic(state),
  ...getAccounts(state),
  ...getXsollaData(state),
  ...getToken(state),
  ...isPaymentInProgress(state),
});

// eslint-disable-next-line
export default compose(
  injectIntl,
  connect(
    mapStateToProps,
    actions,
  ),
  withRouter,
  withProps(({ intl: { formatMessage } }) => ({
    MSGNoInvoiceData: formatMessage(messages.noInvoiceData),
  })),
  withConfigSizes,
)(Dashboard);
