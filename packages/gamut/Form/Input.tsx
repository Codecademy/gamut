import React, { InputHTMLAttributes } from 'react';
import cx from 'classnames';
import s from './styles/Input.scss';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  error?: boolean;
  htmlFor?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
};

const Input: React.FC<InputProps> = ({
  error,
  htmlFor,
  className,
  ...rest
}) => {
  const classNames = cx(
    s.Input,
    {
      [s.error]: error,
    },
    className
  );
  return <input {...rest} id={htmlFor} className={classNames} />;
};

Input.defaultProps = {
  type: 'text',
};

export default Input;
