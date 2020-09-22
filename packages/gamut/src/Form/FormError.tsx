import React, { HTMLAttributes } from 'react';
import cx from 'classnames';
import s from './styles/FormError.module.scss';

export const FormError: React.FC<HTMLAttributes<HTMLSpanElement>> = (props) => {
  return <span className={cx(s.formError, props.className)} {...props} />;
};
