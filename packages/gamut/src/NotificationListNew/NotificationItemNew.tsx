import React from 'react';

import { Box } from '..';
import { Notification } from '../NotificationList/typings';
import { Truncate } from '../Truncate';

export type NotificationItemNewProps = {
  handleDismiss?: () => void;
  notification: Notification;
  onClick?: (event: object) => void;
};

export const NotificationItemNew: React.FC<NotificationItemNewProps> = ({
  handleDismiss,
  notification,
  onClick,
}) => {
  const { date, text } = notification;

  return (
    <Box paddingY={8}>
      <Truncate lines={3}>{text}</Truncate>
      <span>{date}</span>
    </Box>
  );
};
