import { states } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';

import { FlexBox } from '../../Box';
import { Text } from '../../Typography';
import {
  determineHorizontalSpacing,
  determineVerticalSpacing,
  renderButton,
} from '../helpers';
import { DisclosureBodyProps } from '../types';

const StyledFlexBox = styled(FlexBox)(
  states({
    withBackground: {
      bg: 'background-selected',
      p: 8,
    },
  })
);

export const DisclosureBody: React.FC<DisclosureBodyProps> = ({
  body,
  withBackground = false,
  spacing = 'normal',
  ctaText,
  ctaCallback,
  buttonPlacement = 'right',
  href,
  button = 'TextButton',
}) => {
  const buttonRequirements = ctaText && ctaCallback;
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
      {buttonRequirements &&
        renderButton(button, ctaText, ctaCallback, buttonPlacement, href)}
    </StyledFlexBox>
  );
};
