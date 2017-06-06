import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/Checkbox.scss';

const Checkbox = ({className, label, htmlFor, ...inputProps}) => {

  const classNames = cx(s.Checkbox, className);

  return (
    <div className={classNames}>
      <input
        {...inputProps}
        id={htmlFor}
        type="checkbox"
        className={s.checkboxInput}
      />
      <label
        htmlFor={htmlFor}
        label={label}
        className={s.checkboxLabel}
      >
        <span className={s.checkboxSpan}>
          {label}
        </span>
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  className: PropTypes.string,
  htmlFor: PropTypes.string.isRequired,
  name: PropTypes.string,
  required: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
  checked: PropTypes.bool
};

export default Checkbox;
