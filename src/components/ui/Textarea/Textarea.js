// @flow
/* eslint-disable jsx-a11y/no-autofocus, eslint react/sort-comp: 0 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';

import { THEME_PREFIX } from 'src/constants';

const baseClass = `${THEME_PREFIX}-textarea`;

type TextareaSizes = 'small' | 'large';

type TextareaWidths = 'small' | 'wide' | 'full';

type TextareaStatuses = 'error' | 'warning' | 'info' | 'success';

type PropsT = {
  id?: string,
  name?: string,
  value?: any,
  defaultValue?: string,
  placeholder?: string,
  title?: string,
  status?: TextareaStatuses,
  tabIndex?: number,
  minLength?: number,
  maxLength?: number,
  disabled?: boolean,
  readOnly?: boolean,
  hidden?: boolean,
  required?: boolean,
  autoFocus?: boolean,
  size?: TextareaSizes,
  width?: TextareaWidths,
  inputRef?: any,
  className?: string,
  onBlur?: Function,
  onDragStart?: Function,
  onDrop?: Function,
  onFocus?: Function,
  onChange?: Function,
};

type StateT = {
  value: any,
};

class Textarea extends PureComponent<PropsT, StateT> {
  static defaultProps = {
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

  handleChange = (e: any) => {
    const { onChange = f => f } = this.props;

    this.setState({ value: e.currentTarget.value }, () => {
      onChange(this.state.value);
    });
  };

  render() {
    const {
      id,
      name,
      defaultValue,
      placeholder,
      title,
      tabIndex,
      minLength,
      maxLength,
      disabled,
      readOnly,
      hidden,
      required,
      autoFocus,
      status,
      width,
      size,
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

    return (
      <textarea
        id={id}
        name={name}
        value={this.state.value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        title={title}
        tabIndex={tabIndex}
        minLength={minLength}
        maxLength={maxLength}
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
      />
    );
  }
}

export default Textarea;
