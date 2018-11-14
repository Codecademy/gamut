import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/Radio.scss';

const Radio = ({
  name,
  value,
  label,
  checked,
  className,
  htmlFor,
  onChange,
  required,
  ...rest
}) => {
  const classNames = cx(s.Radio, className);
  return (
    <div className={classNames}>
      <input
        className={s.radioInput}
        id={htmlFor}
        name={name}
        required={required}
        type="radio"
        label={label}
        checked={checked}
        onChange={onChange}
        value={value}
        {...rest}
      />
      <label htmlFor={htmlFor} className={s.radioLabel}>
        {label}
      </label>
    </div>
  );
};

Radio.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.node,
  checked: PropTypes.bool,
  className: PropTypes.string,
  htmlFor: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

export default Radio;
