import { Box, FlexBox } from '@codecademy/gamut';
import React from 'react';

import { Text } from '../..';
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
          as="p"
          textColor="hyper"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="flex-end"
          marginBottom={0}
          width="100%"
        >
          <Box as="span" textColor="navy" fontFamily="accent" fontSize={14}>
            Enrolled...
          </Box>
          <Box as="span">Keep Going</Box>
        </FlexBox>
      )}
    </div>
  );
};
