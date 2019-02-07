// @flow
/* eslint-disable react/require-default-props,react/no-find-dom-node */

import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';

import { THEME_PREFIX } from 'src/constants';

type Props = {
  input: any,
  hint?: any,
  help?: any,
  prefix?: any,
  sufix?: any,
  inline?: boolean | null,
  error?: string,
  size?: any,
  className?: string,
};

const baseClass = `${THEME_PREFIX}-input-group`;

const cloneElement = (element: any, props: any = {}) => {
  if (!element || !React.isValidElement(element)) {
    return element;
  }

  const properties = {
    ...props,
    ref: React.isValidElement(element) ? props.ref : null,
  };

  return React.cloneElement(element, properties);
};

class InputGroup extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);

    this.isUpdated = false;

    this.prefixRef = React.createRef();
    this.inputRef = React.createRef();
    this.sufixRef = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => this.adjustPaddings(), 100);
  }

  componentDidUpdate() {
    setTimeout(() => this.adjustPaddings(), 100);
  }

  isUpdated: boolean;
  prefixRef: any;
  inputRef: any;
  sufixRef: any;

  adjustPaddings() {
    if (!this.inputRef.current) {
      return;
    }

    if (!this.isUpdated) {
      this.isUpdated = true;

      this.forceUpdate();

      return;
    }

    const input = findDOMNode(this.inputRef.current);

    if (this.prefixRef.current) {
      const prefix = findDOMNode(this.prefixRef.current);
      // $FlowIssue
      input.style.paddingLeft = `${prefix.getBoundingClientRect().width + 5}px`;
    }

    if (this.sufixRef.current) {
      const sufix = findDOMNode(this.sufixRef.current);
      // $FlowIssue
      input.style.paddingRight = `${sufix.getBoundingClientRect().width + 5}px`;
    }
  }

  render() {
    const {
      input,
      hint,
      prefix,
      sufix,
      error,
      help,
      inline,
      size,
      className,
    } = this.props;

    const classes = classNames(
      baseClass,
      inline && `${baseClass}--inline`,
      className,
    );

    return (
      <div className={classes}>
        {hint && (
          <small className={`${THEME_PREFIX}-input__hint`}>{hint}</small>
        )}

        {prefix && (
          <span className={`${baseClass}__prefix`} ref={this.prefixRef}>
            {cloneElement(prefix)}
          </span>
        )}
        {input && (
          <span className={`${baseClass}__field`}>
            {cloneElement(input, { ref: this.inputRef, size })}
          </span>
        )}
        {sufix && (
          <span className={`${baseClass}__sufix`} ref={this.sufixRef}>
            {cloneElement(sufix)}
          </span>
        )}

        {error && (
          <div className={`${THEME_PREFIX}-input__message`}>{error}</div>
        )}
        {help && !error && (
          <div className={`${THEME_PREFIX}-input__help`}>{help}</div>
        )}
      </div>
    );
  }
}

export default InputGroup;
