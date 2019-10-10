import React from 'react';
import cx from 'classnames';
import Icon from '../../Icon';
import styles from './styles.scss';
function CardButton(props) {
  return React.createElement(
    'button',
    {
      className: cx(styles.buttonContainer, props.className),
      onClick: props.action,
      type: 'button',
    },
    props.icon ? props.icon : React.createElement('div', null),
    React.createElement(
      'div',
      { className: styles.displayHorizontal },
      React.createElement(
        'div',
        { className: styles.buttonTitle },
        props.title
      ),
      props.withArrow &&
        React.createElement(
          'div',
          { className: styles.buttonArrow },
          React.createElement(Icon, { name: 'rightArrow', size: 22 })
        )
    )
  );
}
export default CardButton;
//# sourceMappingURL=index.js.map
