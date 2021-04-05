import styled from '@emotion/styled';
import { isEmpty } from 'lodash';
import React from 'react';

import { Box, Pattern } from '..';
import { Notification } from '../NotificationList/typings';
import { EmptyNotification } from './EmptyNotification';
import { NotificationItemNew } from './NotificationItemNew';

export type NotificationListNewProps = {
  onDismiss?: (notification: Notification) => void;
  notifications: Notification[];
  onNotificationClick?: (notification: Notification) => void;
  headerElementId?: string; // Used for aria-labelledby for the list.
};

const UnstyledUnorderedList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const NotificationListNew: React.FC<NotificationListNewProps> = ({
  notifications,
  onNotificationClick,
  onDismiss,
  headerElementId,
}) => {
  const separatorPattern = (
    <Box as="li" paddingX={32} margin={0} aria-hidden="true">
      <Pattern name="dotsDense" height="1px" display="flex" />
    </Box>
  );

  return (
    <UnstyledUnorderedList aria-labelledby={headerElementId} aria-live="polite">
      {isEmpty(notifications) ? (
        <EmptyNotification />
      ) : (
        notifications.map((notification: Notification) => {
          return (
            <React.Fragment key={notification.id}>
              <NotificationItemNew
                notification={notification}
                handleClick={() => onNotificationClick?.(notification)}
                handleDismiss={() => onDismiss?.(notification)}
              />
              {separatorPattern}
            </React.Fragment>
          );
        })
      )}
    </UnstyledUnorderedList>
  );
};
