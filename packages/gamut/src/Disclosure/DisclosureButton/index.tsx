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
  determineRotationSize,
  determineTitleSize,
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
  heading,
  headingLevel = 'h3',
  overline,
  subheading,
  isExpanded,
  setIsExpanded,
  disabled = false,
}) => {
  const handleClick = () => {
    if (setIsExpanded) {
      setIsExpanded((prev: boolean) => !prev);
    }
  };

  const rotationSize = determineRotationSize(spacing);
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
          alignItems="center"
        >
          <Text
            textAlign="start"
            as={headingLevel}
            width="100%"
            p={0}
            variant={determineTitleSize(spacing)}
            fontWeight="title"
          >
            {heading}
          </Text>

          <Rotation
            rotated={isExpanded}
            height={rotationSize}
            width={rotationSize}
          >
            {spacing === 'normal' ? (
              <ArrowChevronDownIcon size={rotationSize} />
            ) : (
              <MiniChevronDownIcon size={rotationSize} />
            )}
          </Rotation>
        </FlexBox>
        {subheading && (
          <Text textAlign="start" width="100%">
            {subheading}
          </Text>
        )}
      </StyledAnchorVariants>
    </FlexBox>
  );
};
