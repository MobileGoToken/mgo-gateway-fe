// @flow

import { compose } from 'recompose';
import { connect } from 'react-redux';

import Auth from './Auth';

const mapStateToProps = () => ({});

const actions = {};

export default compose(
  connect(
    mapStateToProps,
    actions,
  ),
)(Auth);
