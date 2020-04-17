import React, { InputHTMLAttributes } from 'react';
import cx from 'classnames';
import s from './styles/Input.module.scss';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  error?: boolean;
  htmlFor?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, htmlFor, className, ...rest }, ref) => {
    const classNames = cx(
      s.Input,
      {
        [s.fileInput]: rest.type === 'file',
      },
      {
        [s.error]: error,
      },
      className
    );
    return <input {...rest} id={htmlFor} ref={ref} className={classNames} />;
  }
);

Input.defaultProps = {
  type: 'text',
};

export default Input;
