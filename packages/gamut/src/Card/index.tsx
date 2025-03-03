import { CheckerDense } from '@codecademy/gamut-patterns';
import { Colors, timingValues } from '@codecademy/gamut-styles';
import * as React from 'react';

import { CardWrapper, DynamicCardWrapper, PatternWrapper, StaticCardWrapper } from './elements';
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

  const hasPattern = shadow === 'patternLeft' || shadow === 'patternRight';

  const setHoverShadow = !isInteractive ? 'default' : shadow === 'patternRight' ? 'shadowRight' : 'shadowLeft';

  const fade = {
    initial: {
      opacity: 100,
      transition: {
        duration: timingValues.slow/1000,
        ease: "easeOut",
      },
    },
    animate: {
      opacity: 0,
      transition: {
        duration: timingValues.slow/1000,
        ease: "easeIn",
      },
    }
  }

  return (
    <CardWrapper
      dimensions={1}
      position= "relative"
      whileHover={ isInteractive ?  "animate" : ""}
    >
      <PatternWrapper variants={fade} hidePattern={!hasPattern}>
        <Pattern
          dimensions={1}
          position="absolute"
          top=".5rem"
          left={shadow === 'patternLeft' ? '-0.5rem' : undefined}
          right={shadow === 'patternRight' ? '-0.5rem' : undefined}
        />
      </PatternWrapper>
      <SelectedWrapper
        // setting bg here since Background requires a bg prop
        // the 'white' color doesn't actually get set since the variant overrides it
        bg={variant !== 'default' ? (variant as Colors) : 'white'}
        variant={variant}
        shadow={shadow}
        hoverShadow={setHoverShadow}
        borderRadius={trueBorderRadius}
        {...rest}
      >
        {children}
      </SelectedWrapper>
    </CardWrapper>
  );
};

