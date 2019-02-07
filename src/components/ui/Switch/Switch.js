// @flow
/* eslint-disable jsx-a11y/no-autofocus, eslint react/sort-comp: 0 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { THEME_PREFIX } from 'src/constants';

const baseClass = `${THEME_PREFIX}-switch`;

type PropsT = {
  id?: string,
  name?: string,
  value?: any,
  title?: string,
  checked?: boolean,
  tabIndex?: number,
  disabled?: boolean,
  hidden?: boolean,
  required?: boolean,
  autoFocus?: boolean,
  inputRef?: any,
  className?: string,
  onBlur?: Function,
  onDragStart?: Function,
  onDrop?: Function,
  onFocus?: Function,
  onChange?: Function,
};

type StateT = {
  checked: boolean,
};

class Switch extends PureComponent<PropsT, StateT> {
  static defaultProps = {
    value: '',
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

  handleChange: Function;

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
      onBlur,
      onDragStart,
      onDrop,
      onFocus,
    } = this.props;

    const classes = classNames(baseClass, className);

    return (
      <input
        type="checkbox"
        role="switch"
        id={id}
        name={name}
        value={value}
        title={title}
        checked={this.state && this.state.checked}
        aria-checked={this.state && this.state.checked}
        tabIndex={tabIndex}
        disabled={disabled}
        hidden={hidden}
        required={required}
        autoFocus={autoFocus}
        ref={inputRef}
        className={classes}
        onChange={this.handleChange}
        onBlur={onBlur}
        onDragStart={onDragStart}
        onDrop={onDrop}
        onFocus={onFocus}
      />
    );
  }
}

export default Switch;
