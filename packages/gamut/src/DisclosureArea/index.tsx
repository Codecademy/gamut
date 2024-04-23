import { states } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';

import { TextButton } from '..';
import { FlexBox } from '../Box';
import {
  determineHorizontalSpacing,
  determineVerticalSpacing,
} from '../Disclosure/helpers';
import { DisclosureAreaProps } from '../Disclosure/types';
import { Text } from '../Typography';

const StyledFlexBox = styled(FlexBox)(
  states({
    withBackground: {
      bg: 'background-selected',
      p: 8,
    },
  })
);

export const DisclosureArea: React.FC<DisclosureAreaProps> = ({
  body,
  withBackground = 'false',
  spacing = 'normal',
  // Remove this default later
  ctaText = 'Button text',
  ctaCallback,
}) => {
  return (
    <StyledFlexBox
      column
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
          pt={withBackground ? 8 : 0}
          onClick={ctaCallback ? () => ctaCallback() : undefined}
        >
          {ctaText}
        </TextButton>
      )}
    </StyledFlexBox>
  );
};
