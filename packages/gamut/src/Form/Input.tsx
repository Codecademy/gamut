import cx from 'classnames';
import React, { forwardRef, InputHTMLAttributes } from 'react';

import styles from './styles/Input.module.scss';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  error?: boolean;
  htmlFor?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, htmlFor, className, id, ...rest }, ref) => {
    const classNames = cx(
      styles.Input,
      {
        [styles.fileInput]: rest.type === 'file',
      },
      {
        [styles.error]: error,
      },
      className
    );
    return (
      <input {...rest} id={id || htmlFor} ref={ref} className={classNames} />
    );
  }
);

Input.defaultProps = {
  type: 'text',
};
