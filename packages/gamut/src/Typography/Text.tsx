import {
  states,
  styledOptions,
  system,
  variant,
} from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import { ComponentProps, forwardRef } from 'react';

import { typographyElementVariants, typographyStyleVariants } from './variants';

const displayVariants = variant({
  variants: typographyStyleVariants,
});

const elementVariants = variant({
  prop: 'as',
  variants: typographyElementVariants,
});

const truncateVariants = variant({
  prop: 'truncate',
  variants: {
    ellipsis: {
      textOverflow: 'ellipsis',
    },
    fade: {
      position: 'relative',
      textOverflow: 'clip',
      '&:after': {
        content: '""',
        position: 'absolute',
        textColor: 'background-current',
        inset: 0,
        left: 0.65,
        background:
          'linear-gradient(to right, rgba(0, 0, 0, 0), currentColor 75%)',
      },
    },
  },
});

const truncateLinesScale = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 };

const truncateLinesProps = variance.create({
  truncateLines: {
    scale: truncateLinesScale,
    property: 'all',
    transform: (truncateLines: number) =>
      truncateLines === 1
        ? {
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }
        : {
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: truncateLines,
            '&:after': {
              top: `${100 - 100 / truncateLines}%`,
            },
          },
  },
});

const textStates = states({
  center: {
    textAlign: 'center',
  },
  block: {
    display: 'block',
  },
  highlight: {
    fontWeight: 'bold',
    minWidth: '0.4rem',
    position: 'relative',
    zIndex: 1,
    // the text is more legible against the background color with text smoothing
    MozOsxFontSmoothing: 'grayscale',
    WebkitFontSmoothing: 'antialiased',
    '&:after': {
      bg: 'primary-inverse',
      content: '""',
      display: 'block',
      height: '32.5%',
      left: '0',
      ml: '-0.2rem' as any,
      position: 'absolute',
      top: '50%',
      width: 'calc(100% + 0.4rem)',
      zIndex: -1,
    },
  },
  screenreader: {
    display: 'inline-block',
    height: '1px',
    width: '1px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    position: 'absolute',
    color: 'transparent',
    left: -9999,
    p: 0,
    m: 0,
    border: 'none',
  },
  smooth: {
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
});

const textProps = variance.compose(
  system.layout,
  system.typography,
  system.color,
  system.space,
  truncateLinesProps
);

export interface BaseTextProps
  extends StyleProps<typeof textProps>,
    StyleProps<typeof textStates>,
    StyleProps<typeof elementVariants>,
    StyleProps<typeof truncateVariants>,
    StyleProps<typeof displayVariants> {}

// if you're going to truncate, you need to provide both of these props or neither
export interface TextTruncateProps extends BaseTextProps {
  truncateLines: Exclude<BaseTextProps['truncateLines'], undefined>;
  truncate: Exclude<BaseTextProps['truncate'], false | undefined>;
}
export interface TextNoTruncateProps extends BaseTextProps {
  truncateLines?: never;
  truncate?: never;
}

export type TextProps = TextTruncateProps | TextNoTruncateProps;

const StyledText = styled('span', styledOptions<'span'>())<TextProps>(
  elementVariants,
  truncateVariants,
  displayVariants,
  textStates,
  textProps
);

export const Text = forwardRef<
  HTMLSpanElement | null,
  ComponentProps<typeof StyledText>
>(({ as = 'span', m = 0, ...rest }, ref) => (
  <StyledText as={as} m={m} ref={ref} {...rest} />
));
