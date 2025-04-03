import {
  ArrowChevronDownIcon,
  MiniChevronDownIcon,
} from '@codecademy/gamut-icons';
import * as React from 'react';

import { Rotation } from '../../Animation';
import { Box, FlexBox } from '../../Box';
import { Text } from '../../Typography';
import { DisclosureButtonWrapper } from '../elements';
import { getRotationSize, getSpacing, getTitleSize } from '../helpers';
import { DisclosureButtonProps } from '../types';

export const DisclosureButton: React.FC<DisclosureButtonProps> = ({
  ariaControlsId,
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

  const titleSize = getTitleSize(spacing);
  const subheadingSize = spacing === 'normal' ? 'p-base' : 'p-small';
  const rotationSize = getRotationSize(spacing);
  const { verticalSpacing, horizontalSpacing } = getSpacing(spacing);

  return (
    <FlexBox>
      <DisclosureButtonWrapper
        aria-expanded={isExpanded}
        aria-controls={ariaControlsId}
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
            variant="p-small"
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

          <Box p={8}>
            <Rotation
              rotated={isExpanded}
              height={rotationSize}
              width={rotationSize}
            >
              {spacing === 'normal' ? (
                <ArrowChevronDownIcon aria-hidden size={rotationSize} />
              ) : (
                <MiniChevronDownIcon aria-hidden size={rotationSize} />
              )}
            </Rotation>
          </Box>
        </FlexBox>
        {subheading && (
          <Text textAlign="start" width="100%" variant={subheadingSize}>
            {subheading}
          </Text>
        )}
      </DisclosureButtonWrapper>
    </FlexBox>
  );
};
