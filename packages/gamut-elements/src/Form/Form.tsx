import React, { FormHTMLAttributes } from 'react';
import cx from 'classnames';
import s from './styles/Form.module.scss';

export type FormProps = FormHTMLAttributes<HTMLFormElement> & {
  className?: string;
};

export const Form: React.FC<FormProps> = ({ method = 'post', ...props }) => {
  const className = cx(s.Form, props.className);

  return <form {...props} method={method} className={className} />;
};

export default Form;
