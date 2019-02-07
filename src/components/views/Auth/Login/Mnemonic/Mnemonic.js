// @flow
import React, { PureComponent } from 'react';
import { Field, FieldArray } from 'redux-form';
import { defineMessages } from 'react-intl';

import { FormField } from '@ui/Form';
import { required } from 'src/utilities/validators';
import { THEME_PREFIX } from 'src/constants';

const baseClass = `${THEME_PREFIX}-mnemonic`;

export const MNEMONIC_FIELDS = Array(12)
  .join(' ')
  .split(' ')
  .map((val, i) => `phrase${i}`);

const messages = defineMessages({
  mnemonic_text: {
    id: 'mnemonic_text',
    defaultMessage:
      'Please enter your 12-word mnemonic phrase in the correct order to access your wallet.',
  },
  mnemonic_invalid: {
    id: 'mnemonic_invalid',
    defaultMessage: 'Invalid mnemonic entered.',
  },
});

type PropsT = {
  invalid: boolean,
  intl: Object,
  change: Function,
  error?: ?string | null,
};

type StateT = {
  invalid: boolean,
};

class Login extends PureComponent<PropsT, StateT> {
  static defaultProps = {
    invalid: false,
  };

  constructor(props) {
    super(props);

    const { intl } = props;

    this.state = { invalid: false };

    this.validators = {
      required: required({ intl }),
    };
  }

  componentWillReceiveProps(nextProps: PropsT) {
    if (this.props.invalid !== nextProps.invalid) {
      this.setState({ invalid: nextProps.invalid });
    }
  }

  onChange = (e, newVal) => {
    const { change } = this.props;

    if (newVal.indexOf(' ') > -1) {
      const splitVal = newVal.split(' ');

      if (splitVal.length === 12) {
        splitVal.forEach((val, index) => {
          change(`phrase${index}`, val);
        });
      }

      e.preventDefault();
    }
  };

  renderFields = () => (
    <div className={`${baseClass}__fields`}>
      {MNEMONIC_FIELDS.map(name => (
        <Field
          component={FormField}
          name={name}
          key={name}
          width="full"
          validate={[this.validators.required]}
          onChange={this.onChange}
        />
      ))}
    </div>
  );

  render() {
    const {
      intl: { formatMessage },
      error,
    } = this.props;

    return (
      <section className={baseClass}>
        <p className={`${baseClass}__messages`}>
          {this.state.invalid && (
            <span className={`${baseClass}__error`}>
              {error || formatMessage(messages.mnemonic_invalid)}
            </span>
          )}
        </p>
        <p className={`${baseClass}__title`}>
          {formatMessage(messages.mnemonic_text)}
        </p>
        <FieldArray name="mnemonic" component={this.renderFields} />
      </section>
    );
  }
}

export default Login;
