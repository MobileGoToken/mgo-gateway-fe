// @flow

import React from 'react';
import classNames from 'classnames';
import { THEME_PREFIX } from 'src/constants';

type LoaderTypes = 'buggy';

type LoaderSizes = 'small';

const baseClass = `${THEME_PREFIX}-loader`;

interface Props {
  children?: any;
  type?: LoaderTypes;
  size?: LoaderSizes;
  textual?: boolean;
  className?: string;
}

const Loader = (props: Props) => {
  const { type, size, textual, children, className } = props;

  const classes = classNames(
    baseClass,
    type && `${baseClass}--${type}`,
    size && `${baseClass}--${size}`,
    textual && `${baseClass}--textual`,
    className,
  );

  return (
    <span className={classes}>
      {children}
      <span className={`${baseClass}__dot`}>.</span>
      <span className={`${baseClass}__dot`}>.</span>
      <span className={`${baseClass}__dot`}>.</span>
    </span>
  );
};

export default Loader;
