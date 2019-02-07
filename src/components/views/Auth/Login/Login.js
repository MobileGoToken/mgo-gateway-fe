// @flow

import React, { Component } from 'react';
import classNames from 'classnames';

import { Form, Button } from '@ui';
import { THEME_PREFIX } from 'src/constants';
import LanguageChange from 'src/components/views/common/LanguageChange';

import Mnemonic from './Mnemonic';

type PropsT = {
  MSGSignIn: string,
  handleSubmit: Function,
  handleLogin: Function,
  isLoginInProgress: boolean,
  error: boolean,
  fail: boolean,
  change: boolean,
};

const baseClass = `${THEME_PREFIX}-login`;
const classes = classNames(baseClass);

class Login extends Component<PropsT> {
  constructor(props) {
    super(props);
    const { location } = props;
    location();
  }

  render() {
    const {
      MSGSignIn,
      handleSubmit,
      handleLogin,
      isLoginInProgress,
      error,
      fail,
      change,
      intl,
      country,
    } = this.props;
    let language;
    if (country)
      switch (country) {
        case 'za':
          language = 'zh';
          break;
        case 'ru':
          language = 'ru';
          break;
        case 'kp':
          language = 'ko';
          break;
        case 'kr':
          language = 'ko';
          break;
        default:
          language = '';
      }
    return (
      <div className={classes}>
        <Form
          onSubmit={handleSubmit(handleLogin)}
          className={`${baseClass}__content`}
        >
          <div className={`${baseClass}__title`}>
            <div className={`${baseClass}__title--logo`} />
          </div>
          <Mnemonic error={error} invalid={fail} change={change} />

          <Button
            action="submit"
            size="large"
            width="full"
            type="primary"
            className={`${baseClass}__button`}
            disabled={isLoginInProgress}
          >
            {MSGSignIn}
          </Button>
          <LanguageChange value={language} intl={intl} />
        </Form>
      </div>
    );
  }
}

export default Login;
