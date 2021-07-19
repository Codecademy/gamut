import {
  Box,
  FlexBox,
  Notification,
  NotificationList,
  Pattern,
  Text,
} from '@codecademy/gamut';
import { Background } from '@codecademy/gamut-styles';
import React from 'react';

import { NotificationsPaneContentsProps } from './types';
import { useNotificationButtons } from './useNotificationButtons';

export const NotificationsPaneContents: React.FC<NotificationsPaneContentsProps> = (
  props
) => {
  const { notifications, onTrackingClick, setNotifications } = props;
  const [clearButton, showButton] = useNotificationButtons(props);

  const onDismiss = (notification: Notification) => {
    setNotifications((oldNotifications) =>
      oldNotifications.filter(
        (oldNotification) => oldNotification.id !== notification.id
      )
    );
  };

  const onNotificationClick = (notification: Notification) => {
    onTrackingClick('notification_bell_cta', notification);

    if (!notification.unread) {
      return;
    }

    setNotifications((oldNotifications) =>
      oldNotifications.map((oldNotification) =>
        oldNotification.id === notification.id
          ? { ...oldNotification, unread: false }
          : oldNotification
      )
    );
  };

  return (
    <Background
      aria-label={`My ${notifications.length} notifications`}
      bg="white"
      pb={24}
      pt={32}
      role="dialog"
    >
      <FlexBox
        alignItems="center"
        flexDirection="row"
        height="40"
        justifyContent="space-between"
        mb={16}
        px={32}
      >
        <Text as="h1" fontSize={22}>
          My Notifications
        </Text>
        {showButton}
      </FlexBox>
      <Box px={32}>
        <Pattern name="checkerDense" height="1px" display="flex" />
      </Box>
      <Box maxHeight="520px" overflow="auto">
        <Box pb={16}>
          <NotificationList
            notifications={notifications}
            onDismiss={onDismiss}
            onNotificationClick={onNotificationClick}
          />
        </Box>
        {clearButton}
      </Box>
    </Background>
  );
};
