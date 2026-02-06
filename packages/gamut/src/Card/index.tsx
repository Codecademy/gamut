import { CheckerDense } from '@codecademy/gamut-patterns';
import { borderRadii, Colors } from '@codecademy/gamut-styles';
import { forwardRef } from 'react';

import { DynamicCardWrapper, MotionBox, StaticCardWrapper } from './elements';
import { hoverShadowLeft, hoverShadowRight, patternFadeInOut } from './styles';
import { CardProps } from './types';

type BorderRadiusToken = keyof typeof borderRadii;

export const Card = forwardRef<HTMLDivElement | null, CardProps>(
  (
    {
      children,
      variant = 'default',
      shadow = 'none',
      isInteractive = false,
      pattern: Pattern = CheckerDense,
      borderRadius,
      width = '100%',
      height = '100%',
      ...rest
    },
    ref
  ) => {
  const defaultBorderRadius: BorderRadiusToken = isInteractive ? 'md' : 'none';
  const trueBorderRadius = borderRadius ?? defaultBorderRadius;
  const resolvedBorderRadius =
    borderRadii[trueBorderRadius as BorderRadiusToken];

  const SelectedWrapper =
    variant === 'default' ? DynamicCardWrapper : StaticCardWrapper;

  const hasPattern = shadow === 'patternLeft' || shadow === 'patternRight';
  const isOutline = shadow === 'outline';

  const setHoverShadow =
    shadow === 'patternRight'
      ? hoverShadowRight(resolvedBorderRadius)
      : hoverShadowLeft(resolvedBorderRadius);

  const initialVariant = isOutline ? 'initialOutline' : 'initial';
  const animateVariant = isOutline ? 'animateOutline' : 'animate';

  return (
    <MotionBox
      height={height}
      initial={initialVariant}
      position="relative"
      whileHover={isInteractive ? animateVariant : ''}
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
            // eslint-disable-next-line gamut/no-inline-style
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
        ref={ref as any}
        shadow={shadow}
        variant={variant}
        variants={setHoverShadow}
        {...rest}
      >
        {children}
      </SelectedWrapper>
    </MotionBox>
  );
  }
);
