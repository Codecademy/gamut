import { useState } from 'react';
import * as React from 'react';

import { TextButton } from '..';
import { Box, FlexBox } from '../Box';
import { Text } from '../Typography'

export type AccordionAreaProps = {
  body: string,
  bodyBg: boolean,
  appearance: string,
  ctaText?: string
}

const determineHorizontalPadding = (size) => {
  const horizontalPaddingSizeMapping = {
    'normal': 16,
    'condensed': 8,
    'compact': 8
  }
  return horizontalPaddingSizeMapping[size]
}

export const AccordionArea: React.FC<AccordionAreaProps> = ({
  body,
  bodyBg,
  ctaText = 'Button text',
}) => {
  // Maybe use BACKGROUND instead of box, and then set a box to limit the width
  return (
    <FlexBox maxWidth='600px' column bg={bodyBg && 'shadow-solid'} p={bodyBg ? 8 : 0}>
      <Text width="100%">
        {body}
      </Text>
      { ctaText &&
        <TextButton alignSelf='flex-end' pt={bodyBg ? 8 : 0}>
          {ctaText}
        </TextButton>
      }
    </FlexBox>
  )
}
