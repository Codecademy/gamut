import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/Form.scss';

const Form = (props) => {
  const className = cx(s.Form, props.className);

  return (
    <form {...props} className={className} />
  );
};

Form.propTypes = {
  className: PropTypes.string
};

export default Form;
