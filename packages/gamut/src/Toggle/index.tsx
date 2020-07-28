import React, { Component } from 'react';
import cx from 'classnames';
import s from './styles/index.module.scss';

export type ToggleProps = {
  checked?: boolean;
  onChange?: (...args: any[]) => any;
  onClick?: (...args: any[]) => any;
  label?: string;
  disabled?: boolean;
  theme?: 'gray-blue' | 'purple';
  size?: 'small' | 'medium';
};

export class Toggle extends Component<ToggleProps, {}> {
  render() {
    const {
      checked,
      onChange,
      onClick,
      label,
      disabled,
      theme = 'gray-blue',
      size = 'medium',
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
          onClick={onClick}
        />
        <span className={s.invisible}>{label}</span>
        <div className={cx(s.track, s[theme], s[`track-${size}`])} />
        <div className={cx(s.thumb, s[`thumb-${size}`])} />
      </label>
    );
  }
}

export default Toggle;
