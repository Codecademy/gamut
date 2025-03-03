import { CheckerDense } from '@codecademy/gamut-patterns';
import { Colors } from '@codecademy/gamut-styles';
import * as React from 'react';
import { useState } from 'react';

import { Box } from '../Box';
import { DynamicCardWrapper, StaticCardWrapper } from './elements';
import { CardProps } from './types';

// export interface CardProps {
//   variant?: 'navy' | 'white' | 'hyper' | 'yellow' | 'beige';
// }

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  shadow = 'none',
  isInteractive = false,
  pattern: Pattern = CheckerDense,
  borderRadius,
  ...rest
}) => {

  const defaultBorderRadius = isInteractive ? 'md' : 'none';
  const trueBorderRadius = !borderRadius ? defaultBorderRadius : borderRadius;

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
  const isInteractiveNotHovering = isInteractive && !isHovering;
  const showPattern =
    hasPattern && (!isInteractive || isInteractiveNotHovering);

  const setHoverShadow = !isInteractive ? 'default' : shadow === 'patternRight' ? 'shadowRight' : 'shadowLeft';

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
          // do it in transition of background to transparent
          // hover {
            // transition={'color 0.5s ease-in-out'}
            // bg={'transparent'}
          // }
          // can also check with framermotion to get the fade right
          // look over checkbox for specificity styles
        />
        // </PatternWrapper>

      )}
      <SelectedWrapper
        bg={variant !== 'default' ? (variant as Colors) : 'white'}
        variant={variant}
        shadow={shadow}
        hoverShadow={setHoverShadow}
        borderRadius={trueBorderRadius}
        {...rest}
      >
        {children}
      </SelectedWrapper>
    </Box>
  );
};

