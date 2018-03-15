import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import s from './styles';

class Toggle extends Component {
  static propTypes = {
    checked: PropTypes.bool,
    onClick: PropTypes.func,
  };

  render() {
    const { checked, onClick } = this.props;

    return (
      <button
        className={cx(s.toggleButton, { [s.toggled]: checked })}
        onClick={onClick}
      >
        <div className={s.track} />
        <div className={s.thumb} />
        <input type="checkbox" checked={checked} className={s.invisible} />
      </button>
    );
  }
}

export default Toggle;
