import {
  ArrowChevronDownIcon,
  MiniChevronDownIcon,
} from '@codecademy/gamut-icons';
import { ColorMode, theme, variant } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
// import { breakpoints, useCurrentMode } from '@codecademy/gamut-styles';
import { useState } from 'react';
import * as React from 'react';

import { Anchor, Rotation, Text, TextButton, WithChildrenProp } from '..';
import { AccordionArea } from '../AccordionArea';
import { Box, FlexBox } from '../Box';
import { determineHorizontalSpacing, determineVerticalSpacing } from './helpers';

// TODO: BODY CAN BE ANYTHING, not just a string!
// how to make body more flexible?
export type AccordionProps = {
  header: string;
  headingLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  body: string;
  bodyBg: boolean;
  initiallyExpanded: boolean;
  spacing: 'normal' | 'condensed' | 'compact';
  colorMode: 'light' | 'dark';
  overline?: string;
  subheader?: string;
  appearance: 'default' | 'block';
  ctaText?: string;
};

const StyledFlexBox = styled(FlexBox)(
  variant({
    defaultVariant: 'default',
    variants: {
      default: {
        bg: 'background-current',
      },
      block: {
        bg: 'background',
        border: 'none',
      },
    },
  })
)

// DO THIS VARIANT CALL OUTSIDE (depends on spacing implementation)
const StyledAnchorVariants = styled(Anchor)(
  variant({
    prop: 'appearance',
    defaultVariant: 'default',
    base: {
      '&:hover': {
        color: 'text',
        bg: 'background-hover',
      },
      '&:focus': {
        color: 'text',
        bg: 'background-selected',
      },
      '&:disabled': {
        color: 'text',
        bg: 'background-disabled',
      },
    },
    variants: {
      default: {
        bg: 'background-current',
      },
      block: {
        bg: 'background',
        border: 'none',
      },
    },
  })
);


export const Accordion: React.FC<AccordionProps> = ({
  header,
  headingLevel = 'h3',
  body,
  bodyBg,
  initiallyExpanded = true,
  overline = 'overline is optional',
  spacing = 'normal',
  subheader = 'subheader is optional',
  ctaText,
}) => {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);

  const handleClick = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <StyledFlexBox
      variant='default'
      width="100%"
      border="solid 1px"
      column
    >
      <StyledAnchorVariants
        aria-label={isExpanded ? 'Collapse Content' : 'Expand Content'}
        aria-expanded={isExpanded}
        onClick={handleClick}
        width="100%"
        variant="interface"
        py={determineVerticalSpacing(spacing)}
        px={determineHorizontalSpacing(spacing)}
      >
        <Text textAlign="start" width="100%" color="text-secondary" fontFamily="accent">
          {overline && overline}
        </Text>
        <FlexBox
          flexDirection="row"
          justifyContent="space-between"
          columnGap={40}
        >
          <Text textAlign="start" as={headingLevel} width="100%">
            {header}
          </Text>
          <Rotation rotated={isExpanded}>
            {spacing === 'normal' ? (
              <ArrowChevronDownIcon />
            ) : (
              <MiniChevronDownIcon />
            )}
          </Rotation>
        </FlexBox>
        <Text textAlign="start" width="100%">
          {subheader && subheader}
        </Text>
      </StyledAnchorVariants>
      {isExpanded && (
          <AccordionArea
            body={body}
            bodyBg={bodyBg}
            ctaText={ctaText}
            spacing={spacing}
          />
      )}
    </StyledFlexBox>
  );
};
