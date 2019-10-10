import React, { Component } from 'react';
import cx from 'classnames';
import { CardShell, CardBody } from '../Card';
import s from './styles/index.scss';
class ToolTip extends Component {
  render() {
    const { children, target, position, id, tipClassName } = this.props;
    return React.createElement(
      'div',
      { className: s.toolTipWrapper },
      React.createElement(
        'button',
        { 'aria-labelledby': id, type: 'button', className: s.targetContainer },
        target
      ),
      React.createElement(
        CardShell,
        {
          className: cx(s.toolTipContainer, s[position], tipClassName),
          role: 'tooltip',
          id: id,
        },
        React.createElement(CardBody, { className: s.toolTipBody }, children)
      )
    );
  }
}
ToolTip.defaultProps = {
  position: 'top-right',
};
export default ToolTip;
//# sourceMappingURL=index.js.map
