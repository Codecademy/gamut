import {
  Box,
  FlexBox,
  Notification,
  NotificationList,
  Text,
} from '@codecademy/gamut';
import { CheckerDense } from '@codecademy/gamut-patterns';
import { Background } from '@codecademy/gamut-styles';
import { useEffect, useRef } from 'react';
import * as React from 'react';

import { NotificationsContentsProps } from './types';
import { useNotificationButtons } from './useNotificationButtons';

export const NotificationsContents: React.FC<NotificationsContentsProps> = (
  props
) => {
  const notificationListRef = useRef<HTMLDivElement>(null);
  const { actions, notifications } = props;
  const [
    clearAllButton,
    showButton,
    visibleNotifications,
  ] = useNotificationButtons({
    actions,
    notifications,
    notificationListRef,
  });

  const onNotificationClick = (notification: Notification) => {
    actions.click(notification);

    if (notification.unread) {
      actions.read([notification]);
    }
  };

  useEffect(() => {
    const unreadVisibleNotifications = visibleNotifications.filter(
      (notification) => notification.unread
    );

    if (unreadVisibleNotifications.length) {
      actions.read(unreadVisibleNotifications);
    }
  }, [actions, visibleNotifications]);

  return (
    <Background
      aria-label={
        notifications.length
          ? `My ${notifications.length} notifications`
          : `My Notifications`
      }
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
        {clearAllButton}
      </FlexBox>
      <Box px={32}>
        <CheckerDense height="1px" display="flex" />
      </Box>
      <Box maxHeight="520px" overflow="auto">
        <Box pb={16} tabIndex={0} ref={notificationListRef}>
          <NotificationList
            notifications={visibleNotifications}
            onDismiss={actions.dismiss}
            onNotificationClick={onNotificationClick}
          />
        </Box>
        {showButton}
      </Box>
    </Background>
  );
};
