import { CheckerDense, PatternProps } from '@codecademy/gamut-patterns';
import {
  Background,
  Colors,
  theme,
  variant
} from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import * as React from 'react';

import { Anchor } from '../Anchor';
import { Box } from '../Box';
import { ButtonSelectors } from '../ButtonBase/ButtonBase';
import { WithChildrenProp } from '../utils';
import { cardVariants, hoverState, shadowVariants } from './styles';

// const outlineStyles = (mode: ColorModes) => ({
//   boxShadow: `-5px 5px ${theme.colors['background-current']}, -5px 5px 0 1px ${theme.colors.black}`,
//   '&:hover': {
//     transform: 'translate(4px, -4px)',
//     boxShadow: `-8px 8px 0 ${
//       mode === 'dark' ? theme.colors['background-current'] : 'currentColor'
//     }`,
//   },
// });

// const DynamicCardWrapper = styled(Box)<CardWrapperProps>(
//   ({ mode = 'light', ...props }) =>
//     variant({
//       prop: 'shadow',
//       base: {
//         position: 'relative',
//         boxShadow: `0px 0px 0 currentColor`,
//         transition: 'box-shadow 200ms ease, transform 200ms ease',
//       },
//       variants: {
//         small: {
//           '&:hover': {
//             transform: 'translate(2px, -2px)',
//             boxShadow: `-4px 4px 0 currentColor`,
//           },
//         },
//         medium: {
//           '&:hover': {
//             transform: 'translate(4px, -4px)',
//             boxShadow: `-8px 8px 0 currentColor`,
//           },
//         },
//         outline: outlineStyles(mode),
//       },
//     })(props)
// );

// const shadowVariants = (mode: ColorModes) =>
//   variant({
//     prop: 'shadow',
//     base: {
//       position: 'relative',
//       boxShadow: `0px 0px 0 currentColor`,
//       transition: 'box-shadow 200ms ease, transform 200ms ease',
//     },
//     variants: {
//       small: {
//         '&:hover': {
//           transform: 'translate(2px, -2px)',
//           boxShadow: `-4px 4px 0 ${mode === 'dark' ? 'white' : 'currentColor'}`,
//         },
//       },
//       medium: {
//         '&:hover': {
//           transform: 'translate(4px, -4px)',
//           boxShadow: `-8px 8px 0 ${mode === 'dark' ? 'white' : 'currentColor'}`,
//         },
//       },
//       outline: outlineStyles(mode),
//     },
//   });

// export interface CardProps {
//   variant?: 'navy' | 'white' | 'hyper' | 'yellow' | 'beige';
// }

// interface CardWrapperProps {
//   outline?: boolean;
//   mode?: ColorModes;
//   shadow?: 'small' | 'medium' | 'outline' | false;
// }

// const CardWrapper = styled(Background)<CardWrapperProps>(
//   ({ mode = 'light', ...props }) => ({
//     ...shadowVariants(mode)(props),
//     ...system.states({
//       outline: {
//         '&:hover': {
//           outline: '1px solid currentColor',
//         },
//       },
//     })(props),
//   })
// );

const AnchorWrapper = styled(Anchor)(
  variant({
    prop: 'hoverState',
    base: {
      color: 'text',
      width: 1,
      borderRadius: 'md',
    },
    variants: {
      default: {
        [ButtonSelectors.HOVER]: {
          transform: 'translate(4px, -4px)',
          boxShadow: `-8px 8px 0 ${theme.colors['shadow-primary']}`,
        },
      },
      hoverRight: {
        [ButtonSelectors.HOVER]: {
          transform: 'translate(4px, 4px)',
          boxShadow: `8px 8px 0 ${theme.colors['shadow-primary']}`,
        },
      }
    }
  })
)

export interface CardContentProps
  extends StyleProps<typeof cardVariants>,
  StyleProps<typeof shadowVariants>,
  StyleProps<typeof hoverState>,
  WithChildrenProp {
    pattern?: React.ComponentType<PatternProps>;
  }

const DynamicCardContent = styled(Box)<CardContentProps>(
  cardVariants,
  shadowVariants,
  hoverState
);

const StaticCardContent = styled(Background)<CardContentProps>(
  cardVariants,
  shadowVariants,
  hoverState
);

export const CardWrapper: React.FC<CardContentProps> = ({
  children,
  variant='default',
  shadow ='none',
  isInteractive=false,
  pattern: Pattern = CheckerDense,
  ...rest
}) => {
  const CardContent = variant === 'default' ? DynamicCardContent : StaticCardContent;
  return (
    <CardContent
      bg={variant !== 'default' ? variant as Colors : 'white'}
      variant={variant}
      shadow={shadow}
      isInteractive={isInteractive}
      {...rest}
    >
      {children}
      { (shadow === 'patternLeft' || shadow === 'patternRight') &&
        <Pattern
          dimensions={1}
          height='100%'
          width='100%'
          position="absolute"
          top=".5rem"
          left={shadow === 'patternLeft' ? '-0.5rem' : undefined}
          right={shadow === 'patternRight' ? '-0.5rem' : undefined}
          zIndex={-1}
        />
      }
    </CardContent>
  );
};

export interface CardProps extends CardContentProps {
  href?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  href = "",
  onClick,
  children,
  variant='default',
  shadow ='none',
  pattern: Pattern = CheckerDense,
}) => {
//   const CardContent = <CardWrapper variant={variant} shadow={shadow} isInteractive={Boolean(href)} pattern={Pattern} >
//   {children}
// </CardWrapper>
  const isInteractive = Boolean(href);
  if(href) {
    return (
      <AnchorWrapper
        variant='interface'
        href={href}
        onClick={onClick}
        hoverState={shadow === 'patternRight' ? 'hoverRight' : 'default'}
        // hoverState='hoverRight'
      >
         <CardWrapper variant={variant} shadow={shadow} isInteractive={isInteractive} pattern={Pattern}>
          {children}
        </CardWrapper>
      </AnchorWrapper>
    )
  }
  return ( <CardWrapper variant={variant} shadow={shadow} isInteractive={Boolean(href)} pattern={Pattern} >
  {children}
</CardWrapper>)
}
