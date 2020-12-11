import cx from 'classnames';
import React, { Component } from 'react';

import styles from './styles/index.module.scss';

export type ToggleProps = {
  checked?: boolean;
  onChange?: (...args: any[]) => any;
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
      label,
      disabled,
      theme = 'gray-blue',
      size = 'medium',
    } = this.props;
    return (
      <label
        className={cx(styles.toggleButton, {
          [styles.toggled]: checked,
          [styles.disabled]: disabled,
        })}
        arial-label={label}
        htmlFor={label}
      >
        <input
          type="checkbox"
          checked={checked}
          className={styles.invisible}
          id={label}
          disabled={disabled}
          onChange={onChange}
        />
        <span className={styles.invisible}>{label}</span>
        <div
          className={cx(styles.track, styles[theme], styles[`track-${size}`])}
        />
        <div className={cx(styles.thumb, styles[`thumb-${size}`])} />
      </label>
    );
  }
}
