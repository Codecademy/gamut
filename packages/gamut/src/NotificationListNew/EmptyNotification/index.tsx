import {
  Bee,
  Browser,
  Confetti,
  Plant,
  Sun,
} from '@codecademy/gamut-illustrations';
import { sample } from 'lodash';
import React from 'react';

import { FlexBox, Text } from '../..';
import { emptyNotificationContents } from './emptyNotificationContents';

export const EmptyNotification = () => {
  const content = sample(emptyNotificationContents)!;

  const getImage = (imageName: string) => {
    switch (imageName) {
      case 'bee':
        return <Bee height={52} width={72} />;
      case 'browser':
        return <Browser height={52} width={62} />;
      case 'confetti':
        return <Confetti height={56} width={62} />;
      case 'plant':
        return <Plant height={55} width={58} />;
      case 'sun':
        return <Sun height={60} width={60} />;
    }
  };

  return (
    <FlexBox
      flexDirection="column"
      alignItems="center"
      paddingTop={32}
      paddingBottom={48}
      data-testId="empty-notification"
    >
      <FlexBox paddingBottom={16}>{getImage(content.image)}</FlexBox>
      <FlexBox flexDirection="column" alignItems="center">
        <Text>{content.text}</Text>
        <Text>{content.subtext}</Text>
      </FlexBox>
    </FlexBox>
  );
};
