import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/FormGroupLabel.scss';

export type FormGroupLabelProps = {
  htmlFor?: string;
  className?: string;
  [i: string]: any;
};

const FormGroupLabel = ({
  htmlFor,
  className,
  ...rest
}: FormGroupLabelProps) => {
  const classNames = cx(s.FormGroupLabel, className);

  if (htmlFor) {
    return <label {...rest} htmlFor={htmlFor} className={classNames} />;
  }

  return <div {...rest} className={classNames} />;
};

FormGroupLabel.propTypes = {
  className: PropTypes.string,
  htmlFor: PropTypes.string,
};

export default FormGroupLabel;
