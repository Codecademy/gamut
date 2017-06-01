import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Button from '../Button';
import s from './styles/FormButton.scss';

const FormButton = (props) => {
  const className = cx(s.FormButton, props.className);
  return (
    <Button
      {...props}
      className={className}
    />
  );
};

FormButton.defaultProps = {
  type: 'submit',
  theme: 'blue'
};

FormButton.propTypes = {
  type: PropTypes.string,
  value: PropTypes.any,
  theme: PropTypes.string,
  className: PropTypes.string
};

export default FormButton;
