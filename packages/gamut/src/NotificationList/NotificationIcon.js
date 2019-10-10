import React from 'react';
import { get } from 'lodash';
import Icon from '../Icon';
import s from './styles/NotificationIcon.scss';
const renderIcon = props => {
  const { iconSettings, iconSlug, imageUrl } = props;
  if (iconSlug) {
    const color = get(iconSettings, 'color');
    const backgroundColor = get(iconSettings, 'backgroundColor');
    const iconStyle = {
      backgroundColor,
      color,
    };
    return React.createElement(
      'div',
      { className: s.iconComponentContainer, style: iconStyle },
      React.createElement(Icon, { name: iconSlug, className: s.iconImage })
    );
  }
  if (imageUrl) {
    return React.createElement('img', {
      src: imageUrl,
      className: s.icon,
      alt: '',
    });
  }
  return null;
};
const NotificationIcon = props =>
  React.createElement('div', { className: s.iconContainer }, renderIcon(props));
export default NotificationIcon;
//# sourceMappingURL=NotificationIcon.js.map
