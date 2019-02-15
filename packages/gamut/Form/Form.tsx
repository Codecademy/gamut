import React, { HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/Form.scss';

export type FormProps = HTMLAttributes<HTMLFormElement> & {
  className?: string;
}

const Form = (props: FormProps) => {
  const className = cx(s.Form, props.className);

  return <form {...props} className={className} />;
};

Form.propTypes = {
  className: PropTypes.string,
};

export default Form;
