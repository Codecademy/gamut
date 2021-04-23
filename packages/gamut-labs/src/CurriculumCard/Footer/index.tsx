import { Box, FlexBox, Text } from '@codecademy/gamut';
import React from 'react';

import { BottomTag, TagColor } from '../BottomTag/index';

export type FooterProps = {
  progressState?: 'completed' | 'inProgress';
  tag?: string;
  tagColor?: TagColor;
};

export const Footer: React.FC<FooterProps> = ({
  progressState,
  tag,
  tagColor,
}) => {
  if (!progressState && tag && tagColor) {
    return <BottomTag text={tag} color={tagColor} />;
  }
  return (
    <div>
      {progressState === 'completed' && (
        <Text fontSize={16} fontFamily="accent" textColor="yellow">
          Completed
        </Text>
      )}
      {progressState === 'inProgress' && (
        <FlexBox
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="flex-end"
          width="100%"
        >
          <Text fontFamily="accent" fontSize={14}>
            Enrolled...
          </Text>
          <Text textColor="hyper">Keep Going</Text>
        </FlexBox>
      )}
    </div>
  );
};
