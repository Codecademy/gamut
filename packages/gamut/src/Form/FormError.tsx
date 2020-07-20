import React, { HTMLAttributes } from 'react';
import cx from 'classnames';
import s from './styles/FormError.module.scss';

export const FormError: React.FC<HTMLAttributes<HTMLSpanElement>> = (props) => {
  return (
    <span
      aria-live="assertive"
      className={cx(s.formError, props.className)}
      {...props}
    />
  );
};

export default FormError;
