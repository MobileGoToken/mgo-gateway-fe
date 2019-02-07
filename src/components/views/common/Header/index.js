import { compose, withProps } from 'recompose';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';

import Header from './Header';
import messages from './messages';

export default compose(
  injectIntl,
  withRouter,
  withProps(({ intl: { formatMessage } }) => ({
    MSGCopyClipboard: formatMessage(messages.copyClipboard),
    MSGAddress: formatMessage(messages.address),
    MSGNumberOfAddresses: formatMessage(messages.numberOfAddresses),
    MSGTotalBalance: formatMessage(messages.totalBalance),
  })),
)(Header);
