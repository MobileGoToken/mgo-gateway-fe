// @flow

// TODO@all fix lint error. Rule temporarily disabled because it clutters eslint output.
/* eslint-disable react/require-default-props */

import React from 'react';
import classNames from 'classnames';
import { THEME_PREFIX } from 'src/constants';

const baseClass = `${THEME_PREFIX}-label`;

type LabelWidths = 'auto' | 'wide' | 'fixed' | 'full';

type PropsT = {
  id?: string,
  type?: string,
  disabled?: boolean,
  text?: string,
  title?: string,
  width?: LabelWidths,
  children: any,
  className?: string,
};

const Label = (props: PropsT) => {
  const { id, type, disabled, text, title, width, children, className } = props;

  const isTogglable =
    type === 'radio' || type === 'checkbox' || type === 'switch';

  const classes = classNames(
    baseClass,
    isTogglable && `${baseClass}--inline`,
    type === 'radio' && `${baseClass}--radio`,
    type === 'checkbox' && `${baseClass}--checkbox`,
    type === 'switch' && `${baseClass}--switch`,
    width && `${baseClass}--${width}`,
    className,
  );

  return (
    // eslint-disable-next-line
    <label className={classes} htmlFor={id} title={title} disabled={disabled}>
      {!isTogglable && text && (
        <span className={`${baseClass}__text`}>{text}</span>
      )}
      {children}
      {isTogglable && text && (
        <span className={`${baseClass}__text`}>{text}</span>
      )}
    </label>
  );
};

export default Label;
