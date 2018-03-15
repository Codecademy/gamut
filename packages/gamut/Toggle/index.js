import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import s from './styles';

class Toggle extends Component {
  static propTypes = {
    checked: PropTypes.bool,
    onClick: PropTypes.func,
    label: PropTypes.string,
  };

  render() {
    const { checked, onClick, label } = this.props;

    return (
      <label
        className={cx(s.toggleButton, { [s.toggled]: checked })}
        onClick={onClick}
        htmlFor={label}
      >
        <input
          type="checkbox"
          checked={checked}
          className={s.invisible}
          id={label}
        />
        <span className={s.invisible}>{label}</span>
        <div className={s.track} />
        <div className={s.thumb} />
      </label>
    );
  }
}

export default Toggle;
