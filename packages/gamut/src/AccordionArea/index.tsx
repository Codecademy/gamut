import { useState } from 'react';
import * as React from 'react';

import { TextButton } from '..';
import { Box, FlexBox } from '../Box';
import { Text } from '../Typography'

export type AccordionAreaProps = {
  body: string,
  bodyBg: boolean,
  size: 'normal' | 'condensed' | 'compact',
  ctaText?: string
}

export const AccordionArea: React.FC<AccordionAreaProps> = ({
  body,
  bodyBg=true,
  size,
  ctaText = 'Button text',
}) => {
  // Maybe use BACKGROUND instead of box, and then set a box to limit the width
  return (
    <FlexBox maxWidth='600px' column bg={bodyBg && 'shadow-solid'} p={bodyBg ? 8 : 0}>
      <Text width="100%" lineHeight={size === 'compact' ? 1.3 : 1.5}>
        {body}
      </Text>
      { ctaText &&
        <TextButton alignSelf='flex-end' pt={bodyBg ? 8 : 0} >
          {ctaText}
        </TextButton>
      }
    </FlexBox>
  )
}
