import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/TextArea.scss';

const TextArea = (props) => {
  const className = cx(s.TextArea, {
    [s.error]: props.error
  }, props.className);

  return (
    <textarea
      {...props}
      id={props.htmlFor}
      name={props.name}
      required={props.required}
      className={className}
    />
  );
};

TextArea.propTypes = {
  className: PropTypes.string,
  htmlFor: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.bool
};

export default TextArea;
