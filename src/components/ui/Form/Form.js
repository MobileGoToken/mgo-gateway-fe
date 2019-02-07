// @flow
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { THEME_PREFIX } from 'src/constants';

type FormTypes = 'dialog';

type FormSizes = 'small' | 'medium' | 'large';

type PropsT = {
  type?: FormTypes,
  size?: FormSizes,
  header?: any,
  footer?: any,
  children: any,
  className?: string,
};

const baseClass = `${THEME_PREFIX}-form`;

const Header = ({
  align,
  children,
  className,
}: {
  align: string,
  children: any,
  className: any,
}) => {
  const classes = classNames(
    `${baseClass}__header`,
    align && `${baseClass}__header--${align}`,
    className,
  );

  return (
    <header className={classes}>
      <h3 className={`${THEME_PREFIX}-heading`}>{children}</h3>
    </header>
  );
};

const Footer = ({
  align,
  children,
  className,
}: {
  align: string,
  children: any,
  className: any,
}) => {
  const classes = classNames(
    `${baseClass}__footer`,
    align && `${baseClass}__footer--${align}`,
    className,
  );

  return <footer className={classes}>{children}</footer>;
};

const Messages = ({ children }: { children: any }) => (
  <section className={`${baseClass}__messages`}>{children}</section>
);

const Actions = ({ children }: { children: any }) => (
  <section className={`${baseClass}__actions`}>{children}</section>
);

class Form extends PureComponent<PropsT> {
  static Header: any;
  static Footer: any;
  static Messages: any;
  static Actions: any;

  render() {
    const { type, size, header, footer, className, children } = this.props;

    const classes = classNames(
      baseClass,
      type && `${baseClass}--${type}`,
      size && `${baseClass}--${size}`,
      className,
    );

    return (
      <form
        {...this.props}
        header={null}
        footer={null}
        noValidate
        className={classes}
      >
        {header}
        <section className={`${baseClass}__body`}>{children}</section>
        {footer}
      </form>
    );
  }
}

Form.Header = Header;
Form.Footer = Footer;
Form.Messages = Messages;
Form.Actions = Actions;

export default Form;
