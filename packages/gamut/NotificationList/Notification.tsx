import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import LinesEllipsis from 'react-lines-ellipsis';
import s from './styles/Notification.scss';

const propTypes = {
  unread: PropTypes.bool,
  link: PropTypes.string,
  text: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  imageUrl: PropTypes.string,
};

export type NotificationProps = {
  unread?: boolean;
  link?: string;
  text?: string;
  date?: Date;
  imageUrl?: string;
};

const formatTime = (notificationDate: Date) => {
  let num, unit;

  const now = new Date();
  const hours_since_notification = Math.abs(now.getTime() - notificationDate.getTime()) / 36e5;

  const HOURS_IN_DAY = 24;

  if(hours_since_notification >= 24) {
    num = Math.round(hours_since_notification/HOURS_IN_DAY);
    unit = num == 1 ? 'day' : 'days';
  } else {
    num = Math.round(hours_since_notification);
    unit = num == 1 ? 'hour' : 'hours';
  }

  return `${num} ${unit}`;
}

const Notification = (props: Notification) => {
  const { unread, link, date, text, imageUrl } = props;

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
    <a href={link} target='_blank' rel='noopener noreferrer' className={notificationClasses}>
      <div>
        <img src={imageUrl} className={s.icon}/>
      </div>
      <div className={s.body}>
        <div className={s.text}>
          <LinesEllipsis
            text={text}
            maxLine={3}
            ellipsis='...'
            basedOn='letters'
          /> 
        </div>
        <div className={timeClasses}>{formatTime(date)} ago</div>
      </div>
    </a>
  );
};

Notification.propTypes = propTypes;

export default Notification;
