import React, { HTMLAttributes } from 'react';
import cx from 'classnames';
import s from './styles/Form.scss';

export type FormProps = HTMLAttributes<HTMLFormElement> & {
  className?: string;
};

const Form = (props: FormProps) => {
  const className = cx(s.Form, props.className);

  return <form {...props} className={className} />;
};

export default Form;
