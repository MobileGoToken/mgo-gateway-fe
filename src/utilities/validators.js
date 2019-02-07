// @flow

import { defineMessages } from 'react-intl';

const messages = defineMessages({
  validatorsRequired: {
    id: 'validatorsRequired',
    defaultMessage: 'Required',
  },
  validatorsNumber: {
    id: 'validatorsNumber',
    defaultMessage: 'Must be a number',
  },
  validatorsAlphanumeric: {
    id: 'validatorsAlphanumeric',
    defaultMessage: 'Only alphanumeric characters',
  },
  validatorsPhone: {
    id: 'validatorsPhone',
    defaultMessage: 'Invalid phone number, must be 10 digits',
  },
  validatorsEmail: {
    id: 'validatorsEmail',
    defaultMessage: 'Email is not valid',
  },
  validatorsMnemonic: {
    id: 'validatorsMnemonic',
    defaultMessage: 'Must have exactly 12 words',
  },
  validatorsPasswordNoSpaces: {
    id: 'validatorsPasswordNoSpaces',
    defaultMessage: 'No spaces',
  },
  validatorsPassword8Min: {
    id: 'validatorsPassword8Min',
    defaultMessage: 'Minimum 8 characters',
  },
  validatorsPasswordAtLeast: {
    id: 'validatorsPasswordAtLeast',
    defaultMessage: 'At least 1 uppercase, lowercase, digit and symbol.',
  },
  validatorsPasswordMatch: {
    id: 'validatorsPasswordMatch',
    defaultMessage: "Passwords don't match",
  },
  validatorsMin: {
    id: 'validatorsMin',
    defaultMessage: 'Minimum allowed value is',
  },
  validatorsMax: {
    id: 'validatorsMax',
    defaultMessage: 'Maximum allowed value is',
  },
  validatorsGreaterThan: {
    id: 'validatorsGreaterThan',
    defaultMessage: 'Value must be greater than',
  },
  validatorsMinLen1: {
    id: 'validatorsMinLen1',
    defaultMessage: 'Must be at least',
  },
  validatorsMinLen2: {
    id: 'validatorsMinLen2',
    defaultMessage: 'characters or more',
  },
  validatorsAddress: {
    id: 'validatorsAddress',
    defaultMessage: "Invalid recipient's address format",
  },
  validatorsVerifyLen: {
    id: 'validatorsVerifyLen',
    defaultMessage: 'Must be exactly 4-digits',
  },
});

type ContextT = { intl: any };

export const required = ({ intl: { formatMessage } }: ContextT) => (
  value?: string,
) => (value ? undefined : formatMessage(messages.validatorsRequired));

export const number = ({ intl: { formatMessage } }: ContextT) => (
  value: string,
) => {
  if (value === undefined || value === null) {
    return undefined;
  }

  // eslint-disable-next-line
  return value && isNaN(value)
    ? formatMessage(messages.validatorsNumber)
    : undefined;
};

export const alphanumeric = ({ intl: { formatMessage } }: ContextT) => (
  value: string,
) =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? formatMessage(messages.validatorsAlphanumeric)
    : undefined;

export const phone = ({ intl: { formatMessage } }: ContextT) => (
  value: string,
) =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? formatMessage(messages.validatorsPhone)
    : undefined;

export const email = ({ intl: { formatMessage } }: ContextT) => (
  value: string,
) =>
  value && !/^.+@.+\..+$/i.test(value)
    ? formatMessage(messages.validatorsEmail)
    : undefined;
export const mnemonic = ({ intl: { formatMessage } }: ContextT) => (
  value: string,
) =>
  value && value.split(' ').length !== 12
    ? formatMessage(messages.validatorsMnemonic)
    : undefined;
export const password = ({ intl: { formatMessage } }: ContextT) => (
  value?: string,
) => {
  if (value && value.length < 8) {
    return formatMessage(messages.validatorsPassword8Min);
  } else if (
    value &&
    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*'~`{}()|?.,<>_+=])[0-9a-zA-Z!@#$%^&*'~`{}()|?.,<>_+=]{8,}$/.test(
      value,
    )
  ) {
    return formatMessage(messages.validatorsPasswordAtLeast);
  }
  return undefined;
};

export const match = ({ intl: { formatMessage } }: ContextT) => (
  value: string,
  toMatch: string,
) =>
  value !== toMatch
    ? formatMessage(messages.validatorsPasswordMatch)
    : undefined;

export const min = ({ intl: { formatMessage } }: ContextT) => (
  value: number,
  minVal: number,
  message?: string,
) =>
  value < minVal
    ? message || `${formatMessage(messages.validatorsMin)} ${minVal}`
    : undefined;

export const max = ({ intl: { formatMessage } }: ContextT) => (
  value: number,
  maxVal: number,
  message?: string,
) =>
  value && value > maxVal
    ? message || `${formatMessage(messages.validatorsMax)} ${maxVal}`
    : undefined;

export const minLen = ({ intl: { formatMessage } }: ContextT) => (
  value: string,
  minLen: number,
) =>
  value && value.length < minLen
    ? `${formatMessage(messages.validatorsMinLen1)} ${minLen} ${formatMessage(
        messages.validatorsMinLen2,
      )}`
    : undefined;

export const codeLen = ({ intl: { formatMessage } }: ContextT) => (
  value: string,
) =>
  value && value.length !== 4
    ? `${formatMessage(messages.validatorsVerifyLen)}`
    : undefined;

export const address = ({ intl: { formatMessage } }: ContextT) => (
  value: string,
) =>
  value && (value.length !== 34 || !value.match(/^[3G][0-9a-zA-Z]+$/))
    ? `${formatMessage(messages.validatorsAddress)}`
    : undefined;

export const greaterThan = ({ intl: { formatMessage } }: ContextT) => (
  value: number,
  minVal: number,
  message?: string,
) =>
  parseFloat(value) <= minVal
    ? message || `${formatMessage(messages.validatorsGreaterThan)} ${minVal}`
    : undefined;
