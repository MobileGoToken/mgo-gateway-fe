export const getLoginMnemonic = ({
  auth: {
    login: { mnemonic },
  },
}) => ({ mnemonic });

export const getAccounts = ({ invoice: { account } }) => ({ account });
export const getXsollaData = ({ invoice: { xsollaData } }) => ({ xsollaData });
export const getToken = ({ invoice: { token } }) => ({ token });
export const isPaymentInProgress = ({ invoice: { paymentInProgress } }) => ({
  paymentInProgress,
});
