// @flow

import React from 'react';
import classNames from 'classnames';
import { THEME_PREFIX } from 'src/constants';

type LinkTypes = 'button' | '';

type LinkTargets = '_blank' | '';

const baseClass = `${THEME_PREFIX}-link`;

interface Props {
  name?: string;
  href: string;
  rel?: string;
  target?: LinkTargets;
  type?: LinkTypes;
  className?: string;
  disabled?: boolean;
  children: any;
}

const Anchor = (props: Props) => {
  const { children, href, rel, target, type, className } = props;
  const rels = classNames('noopener', 'noreferrer', rel);
  const isButton = type && type === 'button';
  const role = isButton ? 'button' : undefined;

  const classes = classNames(
    isButton ? `${THEME_PREFIX}-button` : baseClass,
    className,
  );

  return (
    <a
      {...props}
      type={undefined}
      href={href}
      rel={rels}
      target={target}
      role={role}
      className={classes}
    >
      {children}
    </a>
  );
};

export default Anchor;
