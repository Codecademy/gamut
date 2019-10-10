import React from 'react';
import cx from 'classnames';
import moment from 'moment';
import Truncate from 'react-truncate';
import NotificationIcon from './NotificationIcon';
import s from './styles/Notification.scss';
const formatTime = notificationDate => {
  return moment(notificationDate).fromNow();
};
const NotificationItem = props => {
  const { notification, onClick } = props;
  const {
    date,
    iconSettings,
    iconSlug,
    imageUrl,
    link,
    text,
    unread,
  } = notification;
  const notificationClasses = cx(s.notification, {
    [s.unread]: unread,
  });
  const TagName = link ? 'a' : 'div';
  const tagProps = link ? { target: '_blank' } : { role: 'presentation' };
  return React.createElement(
    TagName,
    Object.assign(
      {
        href: link,
        rel: 'noopener noreferrer',
        className: cx(notificationClasses),
        onClick: onClick,
      },
      tagProps
    ),
    React.createElement(NotificationIcon, {
      iconSettings: iconSettings,
      iconSlug: iconSlug,
      imageUrl: imageUrl,
    }),
    React.createElement(
      'div',
      { className: s.body },
      React.createElement(
        'div',
        { className: s.text },
        React.createElement(Truncate, { lines: 3, ellipsis: '...' }, text)
      ),
      React.createElement('div', { className: s.time }, formatTime(date))
    )
  );
};
export default NotificationItem;
//# sourceMappingURL=NotificationItem.js.map
