import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/Radio.scss';

const Radio = (props) => {
  const className = cx(s.Radio, props.className);
  return (
    <div className={className}>
      <input
        className={s.radioInput}
        id={props.htmlFor}
        name={props.name}
        required={props.required}
        type="radio"
        label={props.label}
        checked={props.checked}
        onChange={props.onChange}
        value={props.value}
      />
      <label
        htmlFor={props.htmlFor}
        className={s.radioLabel}
      >
        {props.label}
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
  required: PropTypes.bool
};

export default Radio;
