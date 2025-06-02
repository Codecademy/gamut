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
        disabled={disabled}
        height="100%"
        px={horizontalSpacing}
        py={verticalSpacing}
        variant="interface"
        width="100%"
        onClick={handleClick}
      >
        {overline && (
          <Text
            color="text-secondary"
            fontFamily="accent"
            textAlign="start"
            variant="p-small"
            width="100%"
          >
            {overline}
          </Text>
        )}
        <FlexBox
          alignItems="center"
          columnGap={40}
          flexDirection="row"
          justifyContent="space-between"
        >
          <Text
            as={headingLevel}
            fontWeight="title"
            p={0}
            textAlign="start"
            variant={titleSize}
            width="100%"
          >
            {heading}
          </Text>

          <Box p={8}>
            <Rotation
              height={rotationSize}
              rotated={isExpanded}
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
          <Text textAlign="start" variant={subheadingSize} width="100%">
            {subheading}
          </Text>
        )}
      </DisclosureButtonWrapper>
    </FlexBox>
  );
};
