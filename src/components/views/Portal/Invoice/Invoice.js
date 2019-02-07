// @flow

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { THEME_PREFIX, AUTH_PAGE, THEME_PREFIX_UPPERCASE } from 'src/constants';
import Header from '@partials/Header';
import { Panel } from '@ui';

const baseClass = `${THEME_PREFIX}-dashboard`;

type Props = {
  MSGNoInvoiceData: string,
  fetchAddresses: Function,
  mnemonic: string,
  match: any,
  fetchXsollaData: Function,
  payment: Function,
  xsollaData: any,
  account: any,
  fetchToken: Function,
  token: string,
};

type State = {
  addressNumber: number,
  selectedAddress: number,
};

class Dashboard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      addressNumber: 5,
      selectedAddress: 0,
    };
  }

  componentDidMount() {
    const {
      fetchAddresses,
      fetchXsollaData,
      mnemonic,
      match: {
        params: { data },
      },
      fetchToken,
    } = this.props;
    fetchAddresses({ num: 5, mnemonic });
    if (data) {
      fetchXsollaData({ data });
    }
    if (this.catchToken) {
      fetchToken(this.catchToken);
    }
  }

  onAddressChange = selectedAddress => {
    this.setState({
      selectedAddress,
    });
  };

  onPaymentClick = () => {
    const { payment, mnemonic, xsollaData, token } = this.props;
    payment({
      address: this.state.selectedAddress,
      mnemonic,
      payment: xsollaData,
      token,
    });
  };

  addressNumberChange = val => {
    const { fetchAddresses, mnemonic } = this.props;
    this.setState({ addressNumber: Number(val) + 5 }, () => {
      fetchAddresses({ num: this.state.addressNumber, mnemonic });
    });
  };

  render() {
    const {
      MSGNoInvoiceData,
      account,
      match: {
        params: { data },
      },
      mnemonic,
    } = this.props;

    if (data || !mnemonic) {
      return <Redirect to={AUTH_PAGE} />;
    }

    return (
      <div className={baseClass}>
        <React.Fragment>
          <div className={`${baseClass}--logo`} />
          <Header
            hasAccounts={account}
            accounts={
              account &&
              account.map(({ balance, address }, i) => ({
                id: i,
                value: i,
                text: `${address} | ${balance /
                  10 ** 8} ${THEME_PREFIX_UPPERCASE}`,
              }))
            }
            currentAccount={this.state.selectedAddress}
            onNumberChange={this.addressNumberChange}
            getAddressValue={this.onAddressChange}
            balance={
              account &&
              account.map(x => x.balance).reduce((a, b) => a + b, 0) / 10 ** 8
            }
          />

          <Panel
            shadowPosition="left-right"
            width="wide"
            className={`${baseClass}__payment`}
            title={MSGNoInvoiceData}
          />
        </React.Fragment>
      </div>
    );
  }
}

export default Dashboard;
