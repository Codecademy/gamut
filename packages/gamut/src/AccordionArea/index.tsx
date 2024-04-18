import { useState } from 'react';
import * as React from 'react';

import { TextButton } from '..';
import { determineHorizontalSpacing, determineVerticalSpacing } from '../Accordion/helpers';
import { Box, FlexBox } from '../Box';
import { Text } from '../Typography';

export type AccordionAreaProps = {
  body: React.ReactNode;
  bodyBg: boolean;
  spacing: 'normal' | 'condensed' | 'compact';
  ctaText?: string;
};

export const AccordionArea: React.FC<AccordionAreaProps> = ({
  body,
  bodyBg = true,
  spacing,
  ctaText = 'Button text',
}) => {
  // Maybe use BACKGROUND instead of box, and then set a box to limit the width
  return (
    <Box
      pb={determineVerticalSpacing(spacing)}
      px={determineHorizontalSpacing(spacing)}
    >
      <FlexBox
        column
        bg={bodyBg && 'background-selected'}
        p={bodyBg ? 8 : 0}
      >
        <Text width="100%" lineHeight={spacing === 'compact' ? 'title' : 'base'} maxWidth="600px">
          {body}
        </Text>
        {ctaText && (
          <TextButton alignSelf="flex-end" pt={bodyBg ? 8 : 0}>
            {ctaText}
          </TextButton>
        )}
      </FlexBox>
    </Box>
  );
};
