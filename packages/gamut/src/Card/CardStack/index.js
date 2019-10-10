import React from 'react';
import cx from 'classnames';
import styles from './styles.scss';
function CardStack() {
  return React.createElement(
    'div',
    { className: styles.container },
    React.createElement('div', { className: styles.cardStack }),
    React.createElement('div', {
      className: cx(styles.cardStack, styles.lower),
    })
  );
}
export default CardStack;
//# sourceMappingURL=index.js.map
