import { states, variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { useState } from 'react';
import * as React from 'react';

import { TextButton } from '..';
import { determineHorizontalSpacing, determineVerticalSpacing } from '../Accordion/helpers';
import { Box, FlexBox } from '../Box';
import { Text } from '../Typography';

export interface AccordionAreaProps {
  body: React.ReactNode;
  areaBackground: 'default' | 'withBackground';
  ctaText?: string;
  spacing?: 'normal' | 'condensed' | 'compact';
  ctaCallback: () => void;
}

// TODO: make this into a state instead (it's boolean)
// shouldn't use background-current
// const MoreStyledFlexBox = styled(FlexBox)(
//   variant({
//     prop: 'areaBackground',
//     defaultVariant: 'default',
//     variants: {
//       default: {
//         bg: 'background-current',
//       },
//       withBackground: {
//         bg: 'background-selected',
//         p: 8
//       },
//     },
//   })
// )

const MoreStyledFlexBox = styled(FlexBox)(
  states({
    withBackground: {
      bg: 'background-selected',
      p: 8
    },
  })
)

export const AccordionArea: React.FC<AccordionAreaProps> = ({
  body,
  areaBackground,
  spacing,
  // Remove this default later
  ctaText = 'Button text',
  ctaCallback,
}) => {
  return (
    <MoreStyledFlexBox
      column
      // areaBackground={areaBackground}
      withBackground
      mb={determineVerticalSpacing(spacing)}
      mx={determineHorizontalSpacing(spacing)}
    >
      <Text width="100%" lineHeight={spacing === 'compact' ? 'title' : 'base'}>
        {body}
      </Text>
      {ctaText && (
        // Add onclick prop
        <TextButton
          alignSelf="flex-end"
          pt={areaBackground === 'withBackground' ? 8 : 0} onClick={() => ctaCallback()}>
          {ctaText}
        </TextButton>
      )}
    </MoreStyledFlexBox>
  );
};
