import { states } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';

import { FlexBox } from '../Box';
import {
  determineHorizontalSpacing,
  determineVerticalSpacing,
  renderButton,
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
  withBackground = false,
  spacing = 'normal',
  ctaText,
  ctaCallback,
}) => {
  return (
    <StyledFlexBox
      column
      withBackground={withBackground}
      mb={determineVerticalSpacing(spacing)}
      mx={determineHorizontalSpacing(spacing)}
    >
      <Text width="100%" lineHeight={spacing === 'compact' ? 'title' : 'base'}>
        {body}
      </Text>
      {ctaText && ctaCallback && renderButton("TextButton", ctaText, ctaCallback)}
    </StyledFlexBox>
  );
};
