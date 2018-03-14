import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import s from './styles';

class Toggle extends Component {
  static propTypes = {
    isToggled: PropTypes.bool,
    onToggle: PropTypes.func,
  };

  render() {
    const { isToggled, onToggle } = this.props;

    return (
      <button
        className={cx(s.toggleButton, { [s.toggled]: isToggled })}
        onClick={onToggle}
      >
        <div className={s.track} />
        <div className={s.thumb} />
      </button>
    );
  }
}

export default Toggle;
