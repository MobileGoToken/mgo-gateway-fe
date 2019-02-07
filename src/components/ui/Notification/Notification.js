import React, { PureComponent } from 'react';
import classNames from 'classnames';

import Button from '@ui/Button';
import { THEME_PREFIX } from 'src/constants';

const baseClass = `${THEME_PREFIX}-notification`;

type NotificationTypes = 'success' | 'info' | 'warning' | 'error' | 'system';
type NotificationSizes = 'wide' | 'full';

interface Props {
  id?: any;
  type?: NotificationTypes;
  size?: NotificationSizes;
  timeout?: number;
  stay?: boolean;
  onClose?: (id: any) => void;
  children: any;
  className?: string;
}

interface State {
  hidden: boolean;
  remove: boolean;
}

class Notification extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { hidden: false, remove: false };
  }

  componentDidMount() {
    const { timeout } = this.props;

    if (timeout) {
      this.tid = setTimeout(this.handleClose, timeout);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.tid);
  }

  tid: any;

  handleClose = () => {
    const { id = Symbol('Notification'), onClose = f => f } = this.props;

    this.setState({ hidden: true }, () =>
      setTimeout(() => this.setState({ remove: true }, () => onClose(id)), 250),
    );
  };

  render() {
    const { type, size, stay, children, className } = this.props;

    const classes = classNames(
      baseClass,
      type && `${baseClass}--${type}`,
      size && `${baseClass}--${size}`,
      className,
    );

    if (this.state.remove) {
      return null;
    }

    return (
      <div className={classes} aria-hidden={this.state.hidden} role="alert">
        <div className={`${baseClass}__message`}>{children}</div>
        {!stay && (
          <Button
            icon
            size="small"
            type="ghost"
            tabIndex={-1}
            className={`${baseClass}__close`}
            onClick={this.handleClose}
          >
            Close
          </Button>
        )}
      </div>
    );
  }
}

export default Notification;
