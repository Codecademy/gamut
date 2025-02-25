import { CheckerDense } from '@codecademy/gamut-patterns';
import { Background, Colors, styledOptions } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { useState } from 'react';

import { Anchor } from '../Anchor';
import { Box } from '../Box';
import {
  cardAnchorVariants,
  cardVariants,
  hoverState,
  shadowVariants,
} from './styles';
import { CardAnchorProps, CardWrapperProps } from './types';

export const AnchorWrapper =
  styled(Anchor)<CardAnchorProps>(cardAnchorVariants);

export const DynamicCardWrapper = styled(Box)<CardWrapperProps>(
  cardVariants,
  shadowVariants,
  hoverState,
);

export const StaticCardWrapper = styled(Background, styledOptions)<CardWrapperProps>(
  cardVariants,
  shadowVariants,
  hoverState,
);

// const PatternWrapper = styled(Box)(patternHoverState);

export const CardWrapper: React.FC<CardWrapperProps> = ({
  children,
  variant = 'default',
  shadow = 'none',
  isInteractive = false,
  pattern: Pattern = CheckerDense,
  ...rest
}) => {
  const SelectedWrapper =
    variant === 'default' ? DynamicCardWrapper : StaticCardWrapper;

  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setTimeout(() => {
      setIsHovering(true);
    }, 100);
  };
  const handleMouseLeave = () => {
    setTimeout(() => {
      setIsHovering(false);
    }, 100);
  };

  const hasPattern = shadow === 'patternLeft' || shadow === 'patternRight';
  const isInteractiveNotHovering = isInteractive && !isHovering
  const showPattern = hasPattern && (!isInteractive || isInteractiveNotHovering)

  return (
    <Box
      dimensions={1}
      position="relative"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      {showPattern && (
        <Pattern
          dimensions={1}
          position="absolute"
          top=".5rem"
          left={shadow === 'patternLeft' ? '-0.5rem' : undefined}
          right={shadow === 'patternRight' ? '-0.5rem' : undefined}
        />
      )}
      <SelectedWrapper
        bg={variant !== 'default' ? (variant as Colors) : 'white'}
        variant={variant}
        shadow={shadow}
        isInteractive={isInteractive}
        {...rest}
      >
        {children}
      </SelectedWrapper>
    </Box>
  );
};
