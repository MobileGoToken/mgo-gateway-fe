import * as React from 'react';
import classNames from 'classnames';
import { THEME_PREFIX } from 'src/constants';

const baseClass = `${THEME_PREFIX}-panel`;

type PanelWidths = 'auto' | 'wide' | 'full';

type ShadowPosition = 'left-right' | 'top-bottom';

interface Props {
  width?: PanelWidths;
  className?: string;
  shadowPosition?: ShadowPosition;
  title?: string;
}

const Panel = (props: Props) => {
  const { children, width, className, shadowPosition, title } = props;
  const shadowClass =
    shadowPosition === 'top-bottom' ? 'shadow-tb' : 'shadow-lr';

  const classes = classNames(
    baseClass,
    width && `${baseClass}--${width}`,
    shadowPosition && `${baseClass}--${shadowClass}`,
    className,
  );

  return (
    <div className={classes}>
      <div className={`${baseClass}__header`}>{title}</div>
      <span className={`${baseClass}__info`}>{children}</span>
    </div>
  );
};

export default Panel;
