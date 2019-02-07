// @flow

import { connect } from 'react-redux';
import { compose, withHandlers, withProps } from 'recompose';
import { reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';

import { login, location } from 'src/state/actions';
import { isLoginInProgress, getLocation } from 'src/state/selectors';

import Login from './Login';
import messages from './messages';

const mapStateToProps = state => ({
  ...isLoginInProgress(state),
  ...getLocation(state),
});

const actions = {
  login,
  location,
};

export default compose(
  injectIntl,
  reduxForm({
    form: 'Login',
  }),
  connect(
    mapStateToProps,
    actions,
  ),
  withHandlers({
    handleLogin: ({ login }) => values => {
      login(values);
    },
  }),
  withProps(({ intl: { formatMessage } }) => ({
    MSGSignIn: formatMessage(messages.signIn),
  })),
)(Login);
