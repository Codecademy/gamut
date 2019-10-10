import React from 'react';
import cx from 'classnames';
import styles from './styles.scss';
function CardContent(props) {
  return React.createElement(
    'div',
    { className: cx(styles.contentContainer, props.className) },
    React.createElement(
      'h3',
      { className: cx(styles.title, props.textClassName) },
      props.title
    ),
    React.createElement(
      'p',
      { className: cx(styles.description, props.textClassName) },
      props.description
    )
  );
}
export default CardContent;
//# sourceMappingURL=index.js.map
