// @flow

import * as React from 'react';
import classNames from 'classnames';

import IconAlert from '@images/icon-alert.svg';
import IconError from '@images/icon-error.svg';
import IconInfo from '@images/icon-info.svg';
import IconSuccess from '@images/icon-success.svg';

import { THEME_PREFIX } from 'src/constants';

const baseClass = `${THEME_PREFIX}-icon`;

type IconSizes =
  | 'tiny'
  | 'small'
  | 'normal'
  | 'large'
  | 'toolbar'
  | 'thumbnail';

type IconSpacing = 'left' | 'right' | 'both';

type IconAlignment = 'top' | 'middle' | 'bottom';

const iconTypes = {
  alert: IconAlert,
  error: IconError,
  success: IconSuccess,
  info: IconInfo,
};

interface Props {
  src: any;
  type?: $Keys<typeof iconTypes>;
  size?: IconSizes;
  title?: string;
  color?: string;
  inline?: boolean;
  spacing?: IconSpacing;
  align?: IconAlignment;
  className?: string;
  onClick?: Function;
}

const Icon = (props: Props) => {
  const {
    type,
    size,
    title,
    color,
    inline,
    spacing,
    align,
    className,
    onClick,
  } = props;

  const src = type ? iconTypes[type] : props.src;
  const Svg = src;
  const Img = (p: Props) => <img src={p.src} alt={p.title} />;

  const classes = classNames(
    baseClass,
    inline && `${baseClass}--inline`,
    size && `${baseClass}--${size}`,
    spacing && `${baseClass}--${spacing}`,
    align && `${baseClass}--${align}`,
    color && `${baseClass}--color`,
    onClick && `${baseClass}--clickable`,
    className,
  );

  return (
    <i
      className={classes}
      title={title}
      role="img"
      aria-hidden="true"
      onClick={onClick}
    >
      {src && typeof src === 'string' && <Img {...props} />}
      {src && typeof src !== 'string' && (
        <Svg title={title} style={color && { fill: color }} />
      )}
    </i>
  );
};

export default Icon;
