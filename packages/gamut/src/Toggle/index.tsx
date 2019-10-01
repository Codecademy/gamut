import React, { Component } from 'react';
import cx from 'classnames';
import s from './styles/index.scss';

export type ToggleProps = {
  checked?: boolean;
  onChange?: (...args: any[]) => any;
  label?: string;
  disabled?: boolean;
};

class Toggle extends Component<ToggleProps, {}> {
  render() {
    const { checked, onChange, label, disabled } = this.props;
    return (
      <label
        className={cx(s.toggleButton, {
          [s.toggled]: checked,
          [s.disabled]: disabled,
        })}
        htmlFor={label}
      >
        <input
          type="checkbox"
          checked={checked}
          className={s.invisible}
          id={label}
          disabled={disabled}
          onChange={onChange}
        />
        <span className={s.invisible}>{label}</span>
        <div className={s.track} />
        <div className={s.thumb} />
      </label>
    );
  }
}

export default Toggle;
