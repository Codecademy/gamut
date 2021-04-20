import { sample } from 'lodash';
import React, { useMemo } from 'react';

import { FlexBox, TextDeprecated } from '../..';
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
        <TextDeprecated>{content.text}</TextDeprecated>
        <TextDeprecated>{content.subtext}</TextDeprecated>
      </FlexBox>
    </FlexBox>
  );
};
