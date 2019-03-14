import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import moment from 'moment';
import Truncate from 'react-truncate';
import s from './styles/Notification.scss';

const propTypes = {
  date: PropTypes.string,
  imageUrl: PropTypes.string,
  link: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  unread: PropTypes.bool,
};

export type NotificationProps = {
  date?: string;
  imageUrl?: string;
  link?: string;
  onClick: Function;
  text?: string;
  unread?: boolean;
};

const formatTime = (notificationDate: string): string => {
  return moment(notificationDate).fromNow();
}

const Notification = (props: Notification) => {
  const { date, imageUrl, link, onClick, text, unread } = props;

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
      <div>
        <img src={imageUrl} className={s.icon}/>
      </div>
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
