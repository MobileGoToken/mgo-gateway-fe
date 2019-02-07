import * as React from 'react';
import classNames from 'classnames';
import { THEME_PREFIX } from 'src/constants';

const baseClass = `${THEME_PREFIX}-separator`;

type PanelWidths = 'auto' | 'wide' | 'full';

type SeparatorStrength = 'small' | 'medium' | 'strong' | 'slayer';

interface Props {
  width?: PanelWidths;
  className?: string;
  strength?: SeparatorStrength;
}

const Panel = (props: Props) => {
  const { width, className, strength } = props;

  const classes = classNames(
    baseClass,
    width && `${baseClass}--${width}`,
    strength && `${baseClass}--${strength}`,
    className,
  );

  return <div className={classes} />;
};

export default Panel;
