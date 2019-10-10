import React from 'react';
import cx from 'classnames';
import Icon from '../../Icon';
import styles from './styles.scss';
function CardEyebrow(props) {
  const textStyle = cx(styles.eyebrowText, {
    [styles.darkTheme]: props.isDarkTheme,
  });
  return React.createElement(
    'div',
    {
      className: cx(styles.displayHorizontal, styles.eyebrow, props.className),
    },
    React.createElement(
      'div',
      { className: styles.displayHorizontal },
      props.iconName &&
        React.createElement(
          'div',
          {
            className: cx(styles.eyebrowIconContainer, {
              [styles.darkThemeIcon]: props.isDarkTheme,
            }),
          },
          React.createElement(Icon, {
            name: props.iconName,
            size: 20,
            color: props.iconColor,
          })
        ),
      React.createElement('div', { className: textStyle }, props.leftText)
    ),
    React.createElement('div', { className: textStyle }, props.rightText)
  );
}
export default CardEyebrow;
//# sourceMappingURL=index.js.map
