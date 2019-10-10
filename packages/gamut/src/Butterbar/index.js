import cx from 'classnames';
import React, { Component } from 'react';
import styles from './styles.scss';
import Button from '../Button';
import CloseIcon from '../Icon/icons/CloseIcon';
const CLOSED = 'closed';
export var ButterbarStyle;
(function(ButterbarStyle) {
  ButterbarStyle['BorderBottom'] = 'border-bottom';
  ButterbarStyle['FullWidth'] = 'full-width';
})(ButterbarStyle || (ButterbarStyle = {}));
class Butterbar extends Component {
  constructor() {
    super(...arguments);
    this.state = { closed: false, rendered: false };
    this.closeButterbar = (event, storage) => {
      event.stopPropagation();
      storage.local.setItem(storage.key, CLOSED);
      this.setState({ closed: true });
    };
  }
  componentDidMount() {
    const { storage } = this.props;
    this.setState({
      closed: storage && storage.local.getItem(storage.key) === CLOSED,
      rendered: true,
    });
  }
  render() {
    if (this.state.closed || !this.state.rendered) return null;
    const {
      children,
      classNames = {},
      displayStyle = ButterbarStyle.FullWidth,
      storage,
      icon,
    } = this.props;
    return React.createElement(
      'div',
      {
        className: cx(
          styles.container,
          classNames.container,
          displayStyle === ButterbarStyle.FullWidth
            ? styles.containerFullWidth
            : styles.containerBordered
        ),
      },
      icon && React.createElement('div', { 'data-testid': 'icon-id' }, icon),
      React.createElement(
        'div',
        { className: cx(styles.content, classNames.content) },
        children
      ),
      storage &&
        React.createElement(
          Button,
          {
            onClick: event => this.closeButterbar(event, storage),
            className: styles.closeButton,
          },
          React.createElement(CloseIcon, null)
        )
    );
  }
}
export default Butterbar;
//# sourceMappingURL=index.js.map
