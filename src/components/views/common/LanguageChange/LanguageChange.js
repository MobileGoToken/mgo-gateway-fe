import React, { Component } from 'react';
import { defineMessages } from 'react-intl';

import { Button } from '@ui';
import { IntlConsumer } from 'src/components/wrappers/IntlProvider';
import iconKorea from '@images/icon-korea.svg';
import iconRussia from '@images/icon-russia.svg';
import iconUsa from '@images/icon-usa.svg';
import iconChina from '@images/icon-china.svg';

const messages = defineMessages({
  english: {
    id: 'english',
    defaultMessage: 'English',
  },
  russian: {
    id: 'russian',
    defaultMessage: 'Русский',
  },
  chinese: {
    id: 'chinese',
    defaultMessage: '中文',
  },
  korean: {
    id: 'korean',
    defaultMessage: '한국어',
  },
});

type Props = {
  intl: any,
  value: string,
};
type State = {
  changeLangOpen: boolean,
};

class LanguageSwitch extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { changeLangOpen: false };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { value } = this.props;
    if (value !== nextProps.value)
      this.context.state.switchLanguage(nextProps.value);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  switchLanguage = val => {
    this.context.state.switchLanguage(val.target.value);
  };

  openLanguageSelect = () => {
    this.setState({ changeLangOpen: true });
    document.addEventListener('mousedown', this.handleClickOutside);
  };

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ changeLangOpen: false });
    }
  }

  render() {
    const {
      intl: { formatMessage },
    } = this.props;

    let currentIcon;
    let currentLang;

    switch (this.context.state.locale) {
      case 'zh':
        currentIcon = iconChina;
        currentLang = formatMessage(messages.chinese);
        break;
      case 'ru':
        currentIcon = iconRussia;
        currentLang = formatMessage(messages.russian);
        break;
      case 'ko':
        currentIcon = iconKorea;
        currentLang = formatMessage(messages.korean);
        break;
      default:
        currentIcon = iconUsa;
        currentLang = formatMessage(messages.english);
    }
    return (
      <IntlConsumer>
        {() => (
          <React.Fragment>
            <Button
              className="mgo-current-language"
              onClick={this.openLanguageSelect}
              icon={currentIcon}
              type="ghost"
            >
              {currentLang}
            </Button>
            <div className="mgo-change-language__wrapper">
              {this.state.changeLangOpen && (
                <div ref={this.setWrapperRef} className="mgo-change-language">
                  <Button
                    value="ko"
                    onClick={this.switchLanguage}
                    icon={iconKorea}
                    type="ghost"
                    className={`${
                      this.context.state.locale === 'ko' ? 'active' : ''
                    }`}
                  >
                    {formatMessage(messages.korean)}
                  </Button>
                  <Button
                    value="zh"
                    onClick={this.switchLanguage}
                    icon={iconChina}
                    type="ghost"
                    className={`${
                      this.context.state.locale === 'zh' ? 'active' : ''
                    }`}
                  >
                    {formatMessage(messages.chinese)}
                  </Button>
                  <Button
                    value="ru"
                    onClick={this.switchLanguage}
                    icon={iconRussia}
                    type="ghost"
                    className={`${
                      this.context.state.locale === 'ru' ? 'active' : ''
                    }`}
                  >
                    {formatMessage(messages.russian)}
                  </Button>
                  <Button
                    value="en"
                    onClick={this.switchLanguage}
                    icon={iconUsa}
                    type="ghost"
                    className={`${
                      this.context.state.locale === 'en'
                        ? 'active'
                        : this.context.state.locale === ''
                        ? 'active'
                        : ''
                    }`}
                  >
                    {formatMessage(messages.english)}
                  </Button>
                </div>
              )}
            </div>
          </React.Fragment>
        )}
      </IntlConsumer>
    );
  }
}
LanguageSwitch.contextType = IntlConsumer;

export default LanguageSwitch;
