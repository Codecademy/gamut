import React, { ReactNode } from 'react';
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

const hoursSince = (notificationDate: Date) => {
  const now = new Date();
  const diff = Math.abs(now.getTime() - notificationDate.getTime()) / 36e5;
  return Math.round(diff);
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
    <a href={link} target="_blank" rel="noopener noreferrer" className={notificationClasses}>
      {/* <div > */}
        <div>
          <img src={imageUrl} className={s.icon}/>
        </div>
        <div className={s.body}>
          <div className={s.text}>
            <LinesEllipsis
              text={text}
              maxLine={3}
              ellipsis='...'
              trimRight
              basedOn='letters'
            /> 
          </div>
          <div className={timeClasses}>{hoursSince(date)} hours ago</div>
        </div>
      {/* </div> */}
    </a>
  );
};

Notification.propTypes = propTypes;

export default Notification;
