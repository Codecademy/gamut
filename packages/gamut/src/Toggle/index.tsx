import React, { Component } from 'react';
import cx from 'classnames';
import s from './styles/index.module.scss';

export type ToggleProps = {
  checked?: boolean;
  onChange?: (...args: any[]) => any;
  label?: string;
  disabled?: boolean;
  theme?: string;
  size?: string;
};

export class Toggle extends Component<ToggleProps, {}> {
  render() {
    const {
      checked,
      onChange,
      label,
      disabled,
      theme = 'gray',
      size = 'md',
    } = this.props;
    return (
      <label
        className={cx(s.toggleButton, {
          [s.toggled]: checked,
          [s.disabled]: disabled,
        })}
        arial-label={label}
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
        <div className={cx(s.track, s[theme], s[`track-${size}`])} />
        <div className={cx(s.thumb, s[`thumb-${size}`], s[size])} />
      </label>
    );
  }
}

export default Toggle;
