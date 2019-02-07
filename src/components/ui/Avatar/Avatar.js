import * as React from 'react';
import classNames from 'classnames';
import IconAvatar from '@images/icon-avatar.svg';

import { THEME_PREFIX } from 'src/constants';

type AvatarSizes = 'small' | 'medium' | 'large';

const baseClass = `${THEME_PREFIX}-avatar`;

interface Props {
  src?: string;
  size?: AvatarSizes;
  title?: string;
  className?: string;
}

const Avatar = (props: Props) => {
  const { src, size, title, className } = props;

  const classes = classNames(
    baseClass,
    size && `${baseClass}--${size}`,
    className,
  );

  return (
    <div className={classes} title={title}>
      {src && <img src={src} alt={title} />}
      {!src && <IconAvatar />}
    </div>
  );
};

export default Avatar;
