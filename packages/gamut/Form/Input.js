import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/Input.scss';

const Input = React.forwardRef(
  ({ error, htmlFor, className, ...rest }, ref) => {
    const classNames = cx(
      s.Input,
      {
        [s.error]: error,
      },
      className
    );
    return <input {...rest} id={htmlFor} className={classNames} ref={ref} />;
  }
);

Input.defaultProps = {
  type: 'text',
};

Input.propTypes = {
  className: PropTypes.string,
  htmlFor: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  error: PropTypes.bool,
};

export default Input;
