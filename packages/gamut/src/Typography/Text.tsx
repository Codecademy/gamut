import { styledOptions, system, variant } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';

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
  base: {
    display: 'inline-block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: 1,
    maxWidth: 1,
  },
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

const textStates = system.states({
  center: {
    textAlign: 'center',
  },
  block: {
    display: 'block',
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
  system.space
);

export interface TextProps
  extends StyleProps<typeof textProps>,
    StyleProps<typeof textStates>,
    StyleProps<typeof truncateVariants>,
    StyleProps<typeof elementVariants>,
    StyleProps<typeof displayVariants> {}

export const Text = styled('span', styledOptions<'span'>())<TextProps>(
  elementVariants,
  displayVariants,
  truncateVariants,
  textStates,
  textProps
);

Text.defaultProps = {
  as: 'span',
  m: 0,
};
