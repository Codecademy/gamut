import { CheckerDense } from '@codecademy/gamut-patterns';
import { Colors } from '@codecademy/gamut-styles';
import * as React from 'react';

import {
  DynamicCardWrapper,
  MotionBox,
  StaticCardWrapper,
} from './elements';
import { hoverShadowLeft, hoverShadowRight, patternFadeInOut } from './styles';
import { CardProps } from './types';

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

  const hasPattern = shadow === 'patternLeft' || shadow === 'patternRight';

  const setHoverShadow =
    shadow === 'patternRight' ? hoverShadowRight : hoverShadowLeft;

  return (
    <MotionBox
      dimensions={1}
      position="relative"
      whileHover={isInteractive ? 'animate' : ''}
    >
      {
        hasPattern && (
          <MotionBox
            variants={patternFadeInOut}
            borderRadius={trueBorderRadius}
          >
            <Pattern
              dimensions={1}
              position="absolute"
              top=".5rem"
              left={shadow === 'patternLeft' ? '-0.5rem' : undefined}
              right={shadow === 'patternRight' ? '-0.5rem' : undefined}
              style={{ borderRadius: 'inherit' }}
            />
          </MotionBox>
        )
      }
      <SelectedWrapper
        // setting bg here since Background requires a bg prop
        // the 'white' color doesn't actually get set since the variant overrides it
        bg={variant !== 'default' ? (variant as Colors) : 'white'}
        variant={variant}
        variants={setHoverShadow}
        shadow={shadow}
        borderRadius={trueBorderRadius}
        p={16}
        maxWidth="100%"
        position="relative"
        border={1}
        {...rest}
      >
        {children}
      </SelectedWrapper>
    </MotionBox>
  );
};
