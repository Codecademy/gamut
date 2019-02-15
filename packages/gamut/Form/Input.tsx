import React, { HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/Input.scss';

export type InputProps = HTMLAttributes<HTMLInputElement> & {
  className?: string;
  error?: boolean;
  htmlFor?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
}

const Input = ({ error, htmlFor, className, ...rest }: InputProps) => {
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

Input.propTypes = {
  className: PropTypes.string,
  htmlFor: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  error: PropTypes.bool,
};

export default Input;
