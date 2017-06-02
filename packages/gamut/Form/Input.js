import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/Input.scss';

const Input = (props) => {
  const className = cx(s.Input, {
    [s.error]: props.error
  }, props.className);
  return (
    <input
      {...props}
      id={props.htmlFor}
      className={className}
    />
  );
};

Input.defaultProps = {
  type: 'text'
};

Input.propTypes = {
  className: PropTypes.string,
  htmlFor: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  error: PropTypes.bool
};

export default Input;
