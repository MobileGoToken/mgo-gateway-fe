// @flow
/* eslint-disable jsx-a11y/no-autofocus, react/sort-comp: 0 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { THEME_PREFIX } from 'src/constants';

import type { InputTypesT } from '../Form/Field';

const baseClass = `${THEME_PREFIX}-input`;

type InputSizes = 'small' | 'large';

type InputWidths = 'auto' | 'wide' | 'full';

type InputStatuses = 'error' | 'warning' | 'info' | 'success';

type PropsT = {
  type?: InputTypesT,
  id?: string,
  name?: string,
  value?: any,
  defaultValue?: string,
  placeholder?: string,
  title?: string,
  pattern?: string,
  status?: InputStatuses,
  tabIndex?: number,
  minLength?: number,
  maxLength?: number,
  min?: number,
  max?: number,
  disabled?: boolean,
  readOnly?: boolean,
  hidden?: boolean,
  required?: boolean,
  autoFocus?: boolean,
  size?: InputSizes,
  width?: InputWidths,
  inputRef?: any,
  className?: string,
  onBlur?: Function,
  onDragStart?: Function,
  onDrop?: Function,
  onFocus?: Function,
  onChange?: Function,
  onKeyDown?: Function,
};

type StateT = {
  value: any,
};

class Input extends PureComponent<PropsT, StateT> {
  static defaultProps = {
    type: 'text',
    value: '',
  };

  constructor(props: PropsT) {
    super(props);

    this.state = { value: this.props.value };
  }

  componentWillReceiveProps(nextProps: PropsT) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleChange: Function;
  handleKeyDown: Function;

  handleKeyDown = (e: any) => {
    const { type, maxLength, onKeyDown = f => f } = this.props;

    if (type === 'number') {
      const specials = [
        46, // delete
        8, // backspace
        9, // tab
        27, // esc
        13, // enter
        110, // decimal point
      ];

      const clipboard = [
        65, // a
        67, // e
        86, // v
      ];

      const {
        target,
        keyCode: code,
        ctrlKey: ctrl,
        shiftKey: shift,
        metaKey: command,
      } = e;

      if (
        specials.indexOf(code) > -1 ||
        ((ctrl || command) && clipboard.indexOf(code) > -1) ||
        (code >= 35 && code <= 40) // end, home, left, up, right, down
      ) {
        return; // let it happen
      }

      if ((shift || (code < 48 || code > 57)) && (code < 96 || code > 105)) {
        e.preventDefault(); // shift, not (numpad) numbers
      }

      if (maxLength && target.value.length >= maxLength) {
        e.preventDefault();
      }
    }

    onKeyDown(e);
  };

  handleChange = (e: any) => {
    const { onChange = f => f } = this.props;

    this.setState({ value: e.currentTarget.value }, () => {
      onChange(this.state.value);
    });
  };

  render() {
    const {
      type,
      id,
      name,
      defaultValue,
      placeholder,
      title,
      pattern,
      tabIndex,
      minLength,
      maxLength,
      min,
      max,
      disabled,
      readOnly,
      hidden,
      required,
      autoFocus,
      status,
      size,
      width,
      inputRef,
      className,
      onBlur,
      onDragStart,
      onDrop,
      onFocus,
    } = this.props;

    const classes = classNames(
      baseClass,
      width && `${baseClass}--${width}`,
      size && `${baseClass}--${size}`,
      status && `${baseClass}--${status}`,
      className,
    );

    const defaultLength = maxLength || 200;

    return (
      <input
        type={type}
        id={id}
        name={name}
        value={this.state.value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        title={title}
        pattern={pattern}
        tabIndex={tabIndex}
        minLength={minLength}
        maxLength={defaultLength}
        min={min}
        max={max}
        disabled={disabled}
        readOnly={readOnly}
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
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}

export default Input;
