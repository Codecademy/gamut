import {
  ArrowChevronDownIcon,
  MiniChevronDownIcon,
} from '@codecademy/gamut-icons';
import { variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';

import { Anchor, Rotation, Text } from '../..';
import { FlexBox } from '../../Box';
import { DisclosureButtonWrapper } from '../elements';
import {
  getRotationSize,
  getSpacing,
  getTitleSize,
} from '../helpers';
import { DisclosureButtonProps } from '../types';


export const DisclosureButton: React.FC<DisclosureButtonProps> = ({
  disabled = false,
  heading,
  headingLevel = 'h3',
  isExpanded,
  overline,
  setIsExpanded,
  spacing = 'normal',
  subheading,
}) => {
  const handleClick = () => {
    if (setIsExpanded) {
      setIsExpanded((prev: boolean) => !prev);
    }
  };

  const titleSize = getTitleSize(spacing)
  const rotationSize = getRotationSize(spacing);
  const { verticalSpacing, horizontalSpacing } = getSpacing(spacing)

  return (
    <FlexBox>
      <DisclosureButtonWrapper
        aria-label={isExpanded ? 'Collapse Content' : 'Expand Content'}
        aria-expanded={isExpanded}
        onClick={handleClick}
        width="100%"
        variant="interface"
        py={verticalSpacing}
        px={horizontalSpacing}
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
            variant={titleSize}
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
      </DisclosureButtonWrapper>
    </FlexBox>
  );
};
