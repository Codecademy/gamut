import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/Checkbox.scss';

const Checkbox = ({ className, label, htmlFor, ...inputProps }) => {
  return (
    <div className={className}>
      <input
        id={htmlFor}
        type="checkbox"
        className={s.invisible}
        {...inputProps}
      />
      <label htmlFor={htmlFor} className={s.checkboxLabel}>
        <div className={s.checkbox}>
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 20 20"
            className={s.checkboxVector}
          >
            <path
              d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"
              className={s.squareVector}
              fill="none"
            />
            <polyline points="4 11 8 15 16 6" className={s.checkVector} />
          </svg>
        </div>
        <span>
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
  label: PropTypes.node,
  onChange: PropTypes.func,
  value: PropTypes.string,
  checked: PropTypes.bool
};

export default Checkbox;
