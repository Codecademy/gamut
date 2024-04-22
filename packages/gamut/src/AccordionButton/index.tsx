import {
  ArrowChevronDownIcon,
  MiniChevronDownIcon,
} from '@codecademy/gamut-icons';
import { variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';

import { Anchor, Rotation, Text } from '..';
import { determineHorizontalSpacing, determineVerticalSpacing } from '../Accordion/helpers';
import { Box, FlexBox } from '../Box';


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
        color: 'text-disabled',
        bg: 'background-disabled',
      },
    },
    // Don't actually need the variant here, but it errors out if omitted
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

export interface AccordionButtonProps {
  // TODO:  pull it directly from variant call
  spacing?: 'normal' | 'condensed' | 'compact';
  header: string;
  headingLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  overline?: string;
  subheader?: string;
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>,
  disabled?: boolean,
}

export const AccordionButton: React.FC<AccordionButtonProps> = ({
  spacing='normal',
  header,
  headingLevel = 'h3',
  overline = 'overline is optional',
  subheader = 'subheader is optional',
  isExpanded,
  setIsExpanded,
  disabled=false,
}) => {
  const handleClick = () => {
    setIsExpanded((prev: boolean)=> !prev);
  };

  return (
    <StyledAnchorVariants
      aria-label={isExpanded ? 'Collapse Content' : 'Expand Content'}
      aria-expanded={isExpanded}
      onClick={handleClick}
      width="100%"
      variant="interface"
      py={determineVerticalSpacing(spacing)}
      px={determineHorizontalSpacing(spacing)}
      disabled={disabled}
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
  )
}
