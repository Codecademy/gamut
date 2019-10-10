import React, { Component } from 'react';
import cx from 'classnames';
import s from './styles/index.scss';
class Toggle extends Component {
  render() {
    const { checked, onChange, label, disabled } = this.props;
    return React.createElement(
      'label',
      {
        className: cx(s.toggleButton, {
          [s.toggled]: checked,
          [s.disabled]: disabled,
        }),
        htmlFor: label,
      },
      React.createElement('input', {
        type: 'checkbox',
        checked: checked,
        className: s.invisible,
        id: label,
        disabled: disabled,
        onChange: onChange,
      }),
      React.createElement('span', { className: s.invisible }, label),
      React.createElement('div', { className: s.track }),
      React.createElement('div', { className: s.thumb })
    );
  }
}
export default Toggle;
//# sourceMappingURL=index.js.map
