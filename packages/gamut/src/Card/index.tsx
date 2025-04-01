import { CheckerDense } from '@codecademy/gamut-patterns';
import { Colors } from '@codecademy/gamut-styles';
import * as React from 'react';

import { DynamicCardWrapper, MotionBox, StaticCardWrapper } from './elements';
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

  const SelectedWrapper =
    variant === 'default' ? DynamicCardWrapper : StaticCardWrapper;

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
        <MotionBox
          borderRadius={trueBorderRadius}
          color="text"
          variants={patternFadeInOut}
        >
          <Pattern
            dimensions={1}
            left={shadow === 'patternLeft' ? '-0.5rem' : undefined}
            position="absolute"
            right={shadow === 'patternRight' ? '-0.5rem' : undefined}
            style={{ borderRadius: 'inherit', color: 'currentcolor' }}
            top=".5rem"
          />
        </MotionBox>
      )}
      <SelectedWrapper
        // setting bg here since Background requires a bg prop
        // the falsy value of '' will not get set since the variant's bg would override it
        bg={variant !== 'default' ? (variant as Colors) : ('' as Colors)}
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
      </SelectedWrapper>
    </MotionBox>
  );
};
