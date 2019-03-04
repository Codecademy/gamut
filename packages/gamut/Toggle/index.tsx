/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import cx from 'classnames';
import s from './styles/index.scss';

export type ToggleProps = {
  checked?: boolean;
  onClick?: (...args: any[]) => any;
  label?: string;
  disabled?: boolean;
};

class Toggle extends Component<ToggleProps, {}> {
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
