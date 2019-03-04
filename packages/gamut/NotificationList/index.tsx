import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import Notification from './Notification';
import s from './styles/index.scss';

const propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.object),
};

export type NotificationListProps = {
  notifications?: object[];
};

const NotificationList = (props: NotificationListProps) => {
  const { notifications } = props;

  if(isEmpty(notifications)) {
    return(<p>No notifications!</p>);
  }

  return (
    <div className={s.notificationsContainer}>
      {notifications.map((notification: object) => {
        return <Notification {...notification}/>
      })}
    </div>
  );
};

NotificationList.propTypes = propTypes;

export default NotificationList;