import { Box, FlexBox, Text } from '@codecademy/gamut';
import * as React from 'react';

import { BetaSticker } from '../../BetaSticker';
import { BottomTag, TagColor } from '../BottomTag/index';

export type FooterProps = {
  beta?: boolean;
  progressState?: 'completed' | 'inProgress';
  tag?: string;
  tagColor?: TagColor;
  footerTextVariant?: 'enrolled' | 'inProgress';
};

export const Footer: React.FC<FooterProps> = ({
  beta,
  progressState,
  tag,
  tagColor,
  footerTextVariant,
}) => {
  if (progressState) {
    return (
      <Box mt="auto">
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
              {footerTextVariant === 'inProgress'
                ? 'In Progress...'
                : 'Enrolled...'}
            </Text>
            <Text textColor="hyper">Keep Going</Text>
          </FlexBox>
        )}
      </Box>
    );
  }
  if (beta) {
    return (
      <Box position="absolute" bottom={0} right={0} pb={16} pr={16}>
        <BetaSticker />
      </Box>
    );
  }
  if (tag && tagColor) {
    return <BottomTag text={tag} color={tagColor} />;
  }
  return null;
};
