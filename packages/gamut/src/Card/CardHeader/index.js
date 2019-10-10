import React from 'react';
import cx from 'classnames';
import styles from './styles.scss';
function CardHeader(props) {
  let backgroundStyles = {
    background: props.backgroundColor,
  };
  if (props.backgroundImage) {
    backgroundStyles = {
      background: `url(${props.backgroundImage}) center center / cover no-repeat`,
    };
  }
  return React.createElement(
    'div',
    {
      className: cx(styles.headerContainer, props.className),
      style: backgroundStyles,
    },
    props.children
  );
}
export default CardHeader;
//# sourceMappingURL=index.js.map
