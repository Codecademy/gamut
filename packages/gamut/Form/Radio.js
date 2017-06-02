import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/Radio.scss';

const Radio = (props) => {
  const className = cx(s.Radio, props.className);
  return (
    <div
      className={className}
    >
      <input
        className={s.radioInput}
        id={props.htmlFor}
        name={props.name}
        required={props.required}
        type="radio"
        label={props.label}
      />
      <label
        htmlFor={props.htmlFor}
        className={s.radioLabel}
      >
        <span
          className={s.radioSpan}
        >
          {props.label}
        </span>
      </label>
    </div>
  );
};

Radio.propTypes = {
  className: PropTypes.string,
  htmlFor: PropTypes.string.isRequired,
  name: PropTypes.string,
  required: PropTypes.bool,
  label: PropTypes.string
};

export default Radio;
