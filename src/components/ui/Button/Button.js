// @flow

// TODO@all fix lint error. Rule temporarily disabled because it clutters eslint output.
/* eslint-disable react/require-default-props */

import React, { PureComponent } from 'react';
import classNames from 'classnames';

import Icon from '@ui/Icon';
import svgBusy from '@images/icon-sync.svg';

import { THEME_PREFIX } from 'src/constants';

const baseClass = `${THEME_PREFIX}-button`;

export type ButtonTypes =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'outline'
  | 'ghost'
  | 'link';

export type ButtonColors = 'success' | 'warning' | 'alert' | 'info' | 'inverse';

export type ButtonShapes = 'round' | 'pill';

export type ButtonSizes = 'small' | 'medium' | 'large';

export type ButtonWidths = 'wide' | 'fixed' | 'full';

export type ButtonActions = 'button' | 'submit' | 'reset';

interface Props {
  id?: string;
  action?: ButtonActions;
  busy?: boolean;
  icon?: any;
  disabled?: boolean;
  hidden?: boolean;
  pressed?: boolean;
  tabIndex?: number;
  type?: ButtonTypes;
  color?: ButtonColors;
  shape?: ButtonShapes;
  size?: ButtonSizes;
  width?: ButtonWidths;
  value?: any;
  inputRef?: any;
  data?: any;
  aria?: any;
  title?: any;
  children: any;
  onClick?: Function;
  className?: string;
}

const createAttributes = (type: any) => (data: any) =>
  Object.keys(data).reduce(
    // $FlowIssue
    (acc, attr) => ({ ...acc, [`${type}-${attr}`]: data[attr] }),
    {},
  );

const dataAttributes = createAttributes('data');
const ariaAttributes = createAttributes('aria');

class Button extends PureComponent<Props> {
  static defaultProps = {
    data: {},
    aria: {},
  };

  render() {
    const {
      id,
      action = 'button',
      busy,
      disabled,
      hidden,
      pressed,
      icon,
      tabIndex,
      type,
      color,
      shape,
      size,
      width,
      value,
      inputRef,
      data,
      aria,
      title,
      onClick,
      children,
      className,
    } = this.props;

    const isLink = type === 'link';

    const role = isLink ? 'link' : undefined;

    const classes = isLink
      ? classNames(
          `${THEME_PREFIX}-link`,
          icon && `${THEME_PREFIX}-link--icon`,
          width && `${THEME_PREFIX}-link--${width}`,
          size && `${THEME_PREFIX}-link--${size}`,
          className,
        )
      : classNames(
          baseClass,
          icon && `${baseClass}--icon`,
          type && `${baseClass}--${type}`,
          color && `${baseClass}--${color}`,
          shape && `${baseClass}--${shape}`,
          width && `${baseClass}--${width}`,
          size && `${baseClass}--${size}`,
          className,
        );

    return (
      <button
        id={id}
        type={action}
        aria-busy={busy}
        disabled={busy || disabled}
        hidden={hidden}
        aria-pressed={pressed}
        tabIndex={tabIndex}
        value={value}
        title={title}
        ref={inputRef}
        role={role}
        onClick={onClick}
        className={classes}
        {...dataAttributes(data)}
        {...ariaAttributes(aria)}
      >
        {!busy &&
          icon &&
          typeof icon !== 'boolean' &&
          typeof busy !== 'boolean' && <Icon src={icon} />}
        {busy && <Icon src={svgBusy} spacing="right" />}
        {children}
      </button>
    );
  }
}

export default Button;
