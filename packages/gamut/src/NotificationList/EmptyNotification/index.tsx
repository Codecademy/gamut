import { sample } from 'lodash';
import React, { useMemo } from 'react';

import { FlexBox } from '../..';
import { Text } from '../../Typography';
import { emptyNotificationContents } from './emptyNotificationContents';

export const EmptyNotification = () => {
  const content = useMemo(() => sample(emptyNotificationContents), [])!;

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
        <Text as="p" mb={16}>
          {content.text}
        </Text>
        <Text as="p">{content.subtext}</Text>
      </FlexBox>
    </FlexBox>
  );
};
