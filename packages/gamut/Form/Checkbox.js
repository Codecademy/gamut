import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './styles/Checkbox.scss';

const Checkbox = (props) => {
  const tag = props.tag;
  const className = cx(s.Checkbox, props.className, {
    [s.tags]: tag
  });
  return (
    <div className={className}>
      <input
        {...props}
        id={props.htmlFor}
        type="checkbox"
        className={s.checkboxInput}
      />
      <label
        htmlFor={props.htmlFor}
        label={props.label}
        className={s.checkboxLabel}
      >
        <span className={s.checkboxSpan}>
          {props.label}
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
  tag: PropTypes.bool
};

export default Checkbox;
