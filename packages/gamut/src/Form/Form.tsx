import cx from 'classnames';
import React, { FormHTMLAttributes } from 'react';

import styles from './styles/Form.module.scss';

export type FormProps = FormHTMLAttributes<HTMLFormElement> & {
  className?: string;
};

export const Form: React.FC<FormProps> = ({ method = 'post', ...props }) => {
  const className = cx(styles.Form, props.className);

  return <form {...props} method={method} className={className} />;
};
