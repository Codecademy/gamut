import React, { FormHTMLAttributes } from 'react';
import cx from 'classnames';
import s from './styles/Form.scss';

export type FormProps = FormHTMLAttributes<HTMLFormElement> & {
  className?: string;
};

const Form = (props: FormProps) => {
  const className = cx(s.Form, props.className);

  return <form {...props} className={className} />;
};

export default Form;
