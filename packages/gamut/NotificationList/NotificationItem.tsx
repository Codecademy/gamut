import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import moment from 'moment';
import Truncate from 'react-truncate';
import iconMap from '../Icon/iconMap';
import NotificationIcon from './NotificationIcon';
import s from './styles/Notification.scss';

const propTypes = {
  date: PropTypes.string,
  iconSettings: PropTypes.object,
  iconSlug: PropTypes.oneOf(Object.keys(iconMap)),
  imageUrl: PropTypes.string,
  link: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  unread: PropTypes.bool,
};

interface iconSettings {
  fillColor: string;
  backgroundColor: string;
}

export type NotificationProps = {
  date?: string;
  iconSettings?: iconSettings;
  iconSlug?: keyof typeof iconMap;
  imageUrl?: string;
  link?: string;
  onClick?: (event: object) => void;
  text?: string;
  unread?: boolean;
};

const formatTime = (notificationDate: string): string => {
  return moment(notificationDate).fromNow();
}

const Notification = (props: NotificationProps) => {
  const { date, iconSettings, iconSlug, imageUrl, link, onClick, text, unread } = props;

  const notificationClasses = cx(
    s.notification,
    {
      [s.unread]: unread
    }
  );

  const timeClasses = cx(
    s.time,
    {
      [s.unread]: unread
    }
  );

  return (
    <a href={link} target='_blank' rel='noopener noreferrer' className={notificationClasses} onClick={onClick}>
      <NotificationIcon iconSettings={iconSettings} iconSlug={iconSlug} imageUrl={imageUrl} />
      <div className={s.body}>
        <div className={s.text}>
          <Truncate
            lines={3}
            ellipsis='...'
          > 
            {text}
          </Truncate>
        </div>
        <div className={timeClasses}>{formatTime(date)}</div>
      </div>
    </a>
  );
};

Notification.propTypes = propTypes;

export default Notification;
