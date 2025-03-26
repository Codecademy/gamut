import { CheckerDense } from '@codecademy/gamut-patterns';
import * as React from 'react';

import { CardWrapper, MotionBox } from './elements';
import { hoverShadowLeft, hoverShadowRight, patternFadeInOut } from './styles';
import { CardProps } from './types';

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  shadow = 'none',
  isInteractive = false,
  pattern: Pattern = CheckerDense,
  borderRadius,
  width = '100%',
  height = '100%',
  ...rest
}) => {
  const defaultBorderRadius = isInteractive ? 'md' : 'none';
  const trueBorderRadius = !borderRadius ? defaultBorderRadius : borderRadius;

  const hasPattern = shadow === 'patternLeft' || shadow === 'patternRight';

  const setHoverShadow =
    shadow === 'patternRight' ? hoverShadowRight : hoverShadowLeft;

  return (
    <MotionBox
      height={height}
      position="relative"
      whileHover={isInteractive ? 'animate' : ''}
      width={width}
    >
      {hasPattern && (
        <MotionBox variants={patternFadeInOut} borderRadius={trueBorderRadius}>
          <Pattern
            dimensions={1}
            left={shadow === 'patternLeft' ? '-0.5rem' : undefined}
            position="absolute"
            right={shadow === 'patternRight' ? '-0.5rem' : undefined}
            style={{ borderRadius: 'inherit' }}
            top=".5rem"
          />
        </MotionBox>
      )}
      <CardWrapper
        border={1}
        borderRadius={trueBorderRadius}
        dimensions={1}
        maxWidth="100%"
        p={16}
        position="relative"
        shadow={shadow}
        variant={variant}
        variants={setHoverShadow}
        {...rest}
      >
        {children}
      </CardWrapper>
    </MotionBox>
  );
};
