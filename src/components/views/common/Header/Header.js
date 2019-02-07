import React, { Fragment } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { THEME_PREFIX, THEME_PREFIX_UPPERCASE } from 'src/constants';
import { Select, Button } from '@ui';

import copyIcon from '@images/icon-copy.svg';

const baseClass = `${THEME_PREFIX}-header`;

type Props = {
  MSGTotalBalance: string,
  MSGCopyClipboard: string,
  MSGAddress: string,
  MSGNumberOfAddresses: string,
  title: string,
  hasAccounts: boolean,
  accounts: Object,
  onNumberChange: Function,
  getAddressValue: Function,
  onCopy: Function,
  currentAccount: string,
  balance: number,
};

const Header = (props: Props) => {
  const {
    MSGCopyClipboard,
    MSGTotalBalance,
    MSGAddress,
    MSGNumberOfAddresses,
    title,
    hasAccounts,
    accounts,
    onNumberChange,
    getAddressValue,
    balance,
    onCopy,
    currentAccount,
  } = props;

  return (
    <header className={baseClass}>
      {hasAccounts && (
        <Fragment>
          <h4 className={`${baseClass}__title`}>{MSGTotalBalance}</h4>
          <h2 className={`${baseClass}__balance`}>
            {balance} {THEME_PREFIX_UPPERCASE}
          </h2>
          <div />
          <div className={`${baseClass}__placeholders`}>
            <span>{MSGNumberOfAddresses}</span>
            <span>{MSGAddress}</span>
          </div>
          <span className={`${baseClass}__select--wrapper`}>
            <Select
              options={{ ...Array.from({ length: 11 }, (_, i) => 5 + i) }}
              onChange={onNumberChange}
              width="auto"
              className={`${baseClass}__select--addresses`}
            />
            <Select
              selected={Object.keys(accounts)[0]}
              onChange={getAddressValue}
              options={accounts}
              width="auto"
              className={`${baseClass}__select--addresses`}
            />
            <CopyToClipboard
              text={accounts[currentAccount].text.split(' ')[0]}
              onCopy={onCopy}
            >
              <Button title={MSGCopyClipboard} type="ghost" icon={copyIcon} />
            </CopyToClipboard>
          </span>
        </Fragment>
      )}
      {title && !hasAccounts && (
        <h4 className={`${baseClass}__title`}>{title}</h4>
      )}
    </header>
  );
};

export default Header;
