import React from 'react';

import { FlexBox, Text } from '..';
import {
  emptyNotificationMessages,
  slugToSvgMap,
} from './assets/emptyNotificationMessages';

export const EmptyNotification = () => {
  const getRandomIndex = (max: number) =>
    Math.floor(Math.random() * Math.floor(max));
  const randomIndex = getRandomIndex(emptyNotificationMessages.length);

  return (
    <FlexBox
      flexDirection="column"
      alignItems="center"
      paddingTop={32}
      paddingBottom={48}
    >
      <FlexBox paddingBottom={16}>
        <img
          alt={emptyNotificationMessages[randomIndex].graphic}
          src={slugToSvgMap[emptyNotificationMessages[randomIndex].graphic]}
        />
      </FlexBox>
      <FlexBox flexDirection="column" alignItems="center">
        <Text>{emptyNotificationMessages[randomIndex].text}</Text>
        <Text>{emptyNotificationMessages[randomIndex].subtext}</Text>{' '}
      </FlexBox>
    </FlexBox>
  );
};
