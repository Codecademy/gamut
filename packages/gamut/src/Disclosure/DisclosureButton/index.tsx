import {
  ArrowChevronDownIcon,
  MiniChevronDownIcon,
} from '@codecademy/gamut-icons';
import { variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';

import { Anchor, Rotation, Text } from '../..';
import { FlexBox } from '../../Box';
import {
  determineHorizontalSpacing,
  determineVerticalSpacing,
} from '../helpers';
import { DisclosureButtonProps } from '../types';

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

export const DisclosureButton: React.FC<DisclosureButtonProps> = ({
  spacing = 'normal',
  header,
  headingLevel = 'h3',
  overline,
  subheader,
  isExpanded,
  setIsExpanded,
  disabled = false,
}) => {
  const handleClick = () => {
    if (setIsExpanded) {
      setIsExpanded((prev: boolean) => !prev);
    }
  };

  return (
    <FlexBox>
      <StyledAnchorVariants
        aria-label={isExpanded ? 'Collapse Content' : 'Expand Content'}
        aria-expanded={isExpanded}
        onClick={handleClick}
        width="100%"
        variant="interface"
        py={determineVerticalSpacing(spacing)}
        px={determineHorizontalSpacing(spacing)}
        disabled={disabled}
        height="100%"
      >
        {overline && (
          <Text
            textAlign="start"
            width="100%"
            color="text-secondary"
            fontFamily="accent"
          >
            {overline}
          </Text>
        )}
        <FlexBox
          flexDirection="row"
          justifyContent="space-between"
          columnGap={40}
        >
          <Text textAlign="start" as={headingLevel} width="100%" p={0}>
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
        {subheader && (
          <Text textAlign="start" width="100%">
            {subheader}
          </Text>
        )}
      </StyledAnchorVariants>
    </FlexBox>
  );
};
