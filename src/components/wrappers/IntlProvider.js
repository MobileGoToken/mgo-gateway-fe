// @flow

import React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import localeEN from 'react-intl/locale-data/en';
import localeRU from 'react-intl/locale-data/ru';
import localeZH from 'react-intl/locale-data/zh';
import localeKO from 'react-intl/locale-data/ko';

import messagesEN from 'src/components/translations/en.json';
import messagesRU from 'src/components/translations/ru.json';
import messagesZH from 'src/components/translations/zh.json';
import messagesKO from 'src/components/translations/ko.json';

addLocaleData([...localeEN, ...localeRU, ...localeZH, ...localeKO]);

const { Provider, Consumer } = React.createContext();

const messages = {
  en: messagesEN,
  ru: messagesRU,
  zh: messagesZH,
  ko: messagesKO,
};

class IntlProviderWrapper extends React.Component {
  constructor(...args) {
    super(...args);

    this.switchLanguage = val => {
      this.setState({ locale: val, messages: messages[val] });
    };

    // pass everything in state to avoid creating object inside render method (like explained in the documentation)
    this.state = {
      locale: 'en',
      messages: messagesEN,
      switchLanguage: this.switchLanguage, // eslint-disable-line
    };
  }

  render() {
    const { children } = this.props;
    const { locale, messages } = this.state;
    return (
      <Provider
        value={{
          state: this.state,
          updateReturnMessage: this.updateReturnMessage,
        }}
      >
        <IntlProvider
          key={locale}
          locale={locale}
          messages={messages}
          defaultLocale="en"
        >
          {children}
        </IntlProvider>
      </Provider>
    );
  }
}

export { IntlProviderWrapper as IntlProvider, Consumer as IntlConsumer };
