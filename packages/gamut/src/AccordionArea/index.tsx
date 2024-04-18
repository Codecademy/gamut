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
          <TextButton alignSelf="flex-end" pt={bodyBg ? 8 : 0} >
            {ctaText}
          </TextButton>
        )}
      </FlexBox>
    </Box>
  );
};
