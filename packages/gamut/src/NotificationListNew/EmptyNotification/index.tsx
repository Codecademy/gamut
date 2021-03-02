import { sample } from 'lodash';
import React from 'react';

import { FlexBox, Text } from '../..';
import { emptyNotificationContents } from './emptyNotificationContents';

export const EmptyNotification = () => {
  const content = sample(emptyNotificationContents)!;

  const Image = content.image;

  return (
    <FlexBox
      flexDirection="column"
      alignItems="center"
      paddingTop={32}
      paddingBottom={48}
      data-testid="empty-notification"
    >
      <FlexBox paddingBottom={16}>
        <Image width={80} height={60} />
      </FlexBox>
      <FlexBox flexDirection="column" alignItems="center">
        <Text>{content.text}</Text>
        <Text>{content.subtext}</Text>
      </FlexBox>
    </FlexBox>
  );
};
