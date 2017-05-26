import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/FormGroupDescription.scss';

const FormGroupDescription = (props) => {
  const className = cx(s.FormGroupDescription, props.className);
  return (
    <div
      {...props}
      className={className}
    />
  );
};

FormGroupDescription.propTypes = {
  className: PropTypes.string
};

export default FormGroupDescription;
