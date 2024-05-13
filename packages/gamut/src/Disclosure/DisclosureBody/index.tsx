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
  // button: Button,
  // button props, add in buttons later
    // can pick certain props based on what stacey wants
}) => {
  // const buttonExists = Boolean(Button)
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
      {/* This is a placeholder for now, not sure why I can't get Button to render... trying to coerce it into a boolean doesn't seem to work (or it's coming back falsy) */}
      {ctaText &&
        ctaCallback &&
        renderButton('TextButton', ctaText, ctaCallback)}
      {/* { (ctaText && ctaCallback && Button) ? 'something' : <Button>
      If doing this, do it outside of the return
        if doing button props, can get rid of ctaText
        also consider `href`
      } */}

    </StyledFlexBox>
  );
};
