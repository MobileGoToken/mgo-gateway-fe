// @flow
/* eslint-disable jsx-a11y/no-autofocus */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { THEME_PREFIX } from 'src/constants';

const baseClass = `${THEME_PREFIX}-checkbox`;

type PropsT = {
  id?: string,
  name?: string,
  value?: any,
  title?: string,
  checked: boolean,
  tabIndex?: number,
  disabled?: boolean,
  hidden?: boolean,
  required?: boolean,
  autoFocus?: boolean,
  inputRef?: any,
  onChange?: Function,
  className?: string,
};

type StateT = {
  checked: boolean,
};

class Checkbox extends PureComponent<PropsT, StateT> {
  static defaultProps = {
    checked: false,
  };

  constructor(props: PropsT) {
    super(props);

    this.state = { checked: !!this.props.checked };
  }

  componentWillReceiveProps(nextProps: PropsT) {
    if (this.props.checked !== nextProps.checked) {
      this.setState({ checked: nextProps.checked });
    }
  }

  handleChange = (e: any) => {
    const { onChange = f => f } = this.props;

    this.setState({ checked: e.currentTarget.checked }, () => {
      onChange(this.state.checked);
    });
  };

  render() {
    const {
      id,
      name,
      value,
      title,
      tabIndex,
      disabled,
      hidden,
      required,
      autoFocus,
      inputRef,
      className,
    } = this.props;

    const classes = classNames(baseClass, className);

    return (
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        title={title}
        checked={this.state.checked}
        tabIndex={tabIndex}
        disabled={disabled}
        hidden={hidden}
        required={required}
        autoFocus={autoFocus}
        ref={inputRef}
        onChange={this.handleChange}
        className={classes}
      />
    );
  }
}

export default Checkbox;
