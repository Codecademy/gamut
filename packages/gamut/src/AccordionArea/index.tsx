import { useState } from 'react';
import * as React from 'react';

import { TextButton } from '..';
import { determineHorizontalSpacing, determineVerticalSpacing } from '../Accordion/helpers';
import { Box, FlexBox } from '../Box';
import { Text } from '../Typography';

export interface AccordionAreaProps {
  body: React.ReactNode;
  bodyBg: boolean
  ctaText?: string;
  spacing: 'normal' | 'condensed' | 'compact';
  ctaCallback: () => void;
}

export const AccordionArea: React.FC<AccordionAreaProps> = ({
  body,
  bodyBg = true,
  spacing,
  // Remove this default later
  ctaText = 'Button text',
  ctaCallback,
}) => {
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
        <Text width="100%" lineHeight={spacing === 'compact' ? 'title' : 'base'}>
          {body}
        </Text>
        {ctaText && (
          // Add onclick prop
          <TextButton alignSelf="flex-end" pt={bodyBg ? 8 : 0} onClick={() => ctaCallback()}>
            {ctaText}
          </TextButton>
        )}
      </FlexBox>
    </Box>
  );
};
