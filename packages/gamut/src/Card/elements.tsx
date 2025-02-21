import { CheckerDense } from '@codecademy/gamut-patterns';
import { Background ,
  Colors,
} from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { Anchor } from '../Anchor';
import { Box } from '../Box';
import { cardAnchorVariants, cardVariants, hoverState, shadowVariants } from './styles';
import { CardAnchorProps, CardWrapperProps } from './types';

export const AnchorWrapper = styled(Anchor)<CardAnchorProps>(
  cardAnchorVariants
)

export const DynamicCardWrapper = styled(Box)<CardWrapperProps>(
  cardVariants,
  shadowVariants,
  hoverState
);

export const StaticCardWrapper = styled(Background)<CardWrapperProps>(
  cardVariants,
  shadowVariants,
  hoverState
);

export const CardWrapper: React.FC<CardWrapperProps> = ({
  children,
  variant='default',
  shadow ='none',
  isInteractive=false,
  pattern: Pattern = CheckerDense,
  ...rest
}) => {
  console.log('pattern is', Pattern);
  console.log('shadow is', shadow);
  const CardWrapper = variant === 'default' ? DynamicCardWrapper : StaticCardWrapper;
  return (
    <CardWrapper
      bg={variant !== 'default' ? variant as Colors : 'white'}
      variant={variant}
      shadow={shadow}
      isInteractive={isInteractive}
      position='relative'
      zIndex={1}
      {...rest}
    >
      { (shadow === 'patternLeft' || shadow === 'patternRight') &&
        <Pattern
          dimensions={1}
          position="absolute"
          top=".5rem"
          left={shadow === 'patternLeft' ? '-0.5rem' : undefined}
          right={shadow === 'patternRight' ? '-0.5rem' : undefined}
          // zIndex={-1}
        />
      }
      {children}
    </CardWrapper>
  );
};

