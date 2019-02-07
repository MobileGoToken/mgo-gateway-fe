// @flow
/* eslint-disable jsx-a11y/no-autofocus, eslint react/sort-comp: 0 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { THEME_PREFIX } from 'src/constants';

const baseClass = `${THEME_PREFIX}-radio`;

type PropsT = {
  id?: string,
  name?: string,
  value?: any,
  title?: string,
  selected?: boolean,
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

class Radio extends PureComponent<PropsT> {
  static defaultProps = {
    selected: false,
  };

  handleChange: Function;

  handleChange = () => {
    const { value, onChange = f => f } = this.props;

    onChange(value);
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
      selected,
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
        type="radio"
        id={id}
        name={name}
        value={value}
        title={title}
        defaultChecked={selected}
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

export default Radio;
