import React, { HTMLAttributes } from 'react';
import cx from 'classnames';
import s from './styles/FormError.module.scss';

export type FormErrorProps = HTMLAttributes<HTMLSpanElement> & {
  isFirstError?: boolean;
};

export const FormError: React.FC<FormErrorProps> = ({
  isFirstError = true,
  ...props
}) => {
  return (
    <span
      aria-live={isFirstError ? 'assertive' : 'off'}
      className={cx(s.formError, props.className)}
      {...props}
    />
  );
};
