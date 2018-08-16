import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/Input.scss';

const Input = ({ error, success, htmlFor, className, showIcons, ...rest }) => {
  const classNames = cx(
    s.Input,
    {
      [s.error]: error,
      [s.success]: success,
    },
    className
  );
  const input = <input {...rest} id={htmlFor} className={classNames} />;

  let icon;
  if (success) {
    icon = '❌';
  } else if (error) {
    icon = '✅';
  }

  if (!showIcons || !icon) return input;
  return (
    <span className={s.wrapper}>
      {input}
      <span className={s.icon}>{icon}</span>
    </span>
  );
};

Input.defaultProps = {
  type: 'text',
  showIcons: true,
};

Input.propTypes = {
  className: PropTypes.string,
  htmlFor: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  showIcons: PropTypes.bool,
};

export default Input;
