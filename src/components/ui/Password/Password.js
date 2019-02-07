// @flow
/* eslint-disable jsx-a11y/no-autofocus, react/sort-comp: 0 */

import * as React from 'react';
import classNames from 'classnames';
import { THEME_PREFIX } from 'src/constants';

import Icon from '@ui/Icon';
import IconEye from '@images/icon-eye.svg';

const baseClass = `${THEME_PREFIX}-input`;

type PasswordSizes = 'small' | 'large';

type PasswordWidths = 'small' | 'wide' | 'full';

interface Props {
  id?: string;
  name?: string;
  value: string;
  defaultValue?: string;
  placeholder?: string;
  title?: string;
  status?: string;
  tabIndex?: number;
  minLength?: number;
  maxLength?: number;
  disabled?: boolean;
  readOnly?: boolean;
  hidden?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  toggle: boolean;
  size?: PasswordSizes;
  width?: PasswordWidths;
  inputRef?: any;
  className?: string;
  onBlur?: Function;
  onDragStart?: Function;
  onDrop?: Function;
  onFocus?: Function;
  onChange?: Function;
}

interface State {
  value: string;
  type: string;
}

class Password extends React.PureComponent<Props, State> {
  static defaultProps = {
    value: '',
  };

  constructor(props: Props) {
    super(props);

    this.state = { value: this.props.value, type: 'password' };

    this.inputRef = this.props.inputRef || React.createRef();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const { onChange = f => f } = this.props;

    this.setState({ value: e.currentTarget.value }, () => {
      onChange(this.state.value);
    });
  };

  handleViewPassword = () =>
    this.setState(
      {
        type: this.state.type === 'password' ? 'text' : 'password',
      },
      () => this.inputRef.current.focus(),
    );

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
      toggle = true,
      className,
      onBlur,
      onDragStart,
      onDrop,
      onFocus,
    } = this.props;

    const passClass = `${THEME_PREFIX}-password`;

    const classes = classNames(
      passClass,
      toggle && `${passClass}--toggle`,
      width && `${passClass}--${width}`,
      size && `${passClass}--${size}`,
      className,
    );

    const inputClasses = classNames(
      baseClass,
      width && `${baseClass}--${width}`,
      size && `${baseClass}--${size}`,
      status && `${baseClass}--${status}`,
      className,
    );

    const defaultLength = maxLength || 200;

    return (
      <span className={classes}>
        <input
          type={this.state.type}
          autoComplete="off"
          id={id}
          name={name}
          value={this.state.value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          title={title}
          tabIndex={tabIndex}
          minLength={minLength}
          maxLength={defaultLength}
          disabled={disabled}
          readOnly={readOnly}
          hidden={hidden}
          required={required}
          autoFocus={autoFocus}
          ref={this.inputRef}
          className={inputClasses}
          onChange={this.handleChange}
          onBlur={onBlur}
          onDragStart={onDragStart}
          onDrop={onDrop}
          onFocus={onFocus}
        />
        {toggle && (
          <Icon
            src={IconEye}
            size="small"
            tabIndex={-1}
            onClick={this.handleViewPassword}
          >
            Show password
          </Icon>
        )}
      </span>
    );
  }
}

export default Password;
