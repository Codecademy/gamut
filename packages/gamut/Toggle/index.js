import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import s from './styles';

class Toggle extends Component {
  static propTypes = {
    checked: PropTypes.bool,
    onClick: PropTypes.func,
    label: PropTypes.string,
    disabled: PropTypes.bool,
  };

  render() {
    const { checked, onClick, label, disabled } = this.props;

    return (
      <label
        className={cx(s.toggleButton, {
          [s.toggled]: checked,
          [s.disabled]: disabled,
        })}
        onClick={onClick}
        htmlFor={label}
      >
        <input
          type="checkbox"
          checked={checked}
          className={s.invisible}
          id={label}
          disabled={disabled}
        />
        <span className={s.invisible}>{label}</span>
        <div className={s.track} />
        <div className={s.thumb} />
      </label>
    );
  }
}

export default Toggle;
