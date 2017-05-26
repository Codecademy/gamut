import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/FormGroupLabel.scss';

const FormGroupLabel = (props) => {
  const className = cx(s.FormGroupLabel, props.className);

  if (props.htmlFor) {
    return (
      <label
        {...props}
        htmlFor={props.htmlFor}
        className={className}
      />
    );
  }

  return (
    <div
      {...props}
      className={className}
    />
  );

};

FormGroupLabel.propTypes = {
  className: PropTypes.string,
  htmlFor: PropTypes.string
};

export default FormGroupLabel;
