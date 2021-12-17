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

const truncateBaseStyles = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const truncateProps = variance.create({
  truncateLines: {
    scale: { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 },
    property: 'all',
    transform: (truncateLines: number) =>
      truncateLines === 0
        ? {}
        : truncateLines === 1
        ? { ...truncateBaseStyles, whiteSpace: 'nowrap' }
        : {
            ...truncateBaseStyles,
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: truncateLines,
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
  system.space,
  truncateProps
);

export interface TextProps
  extends StyleProps<typeof textProps>,
    StyleProps<typeof textStates>,
    StyleProps<typeof elementVariants>,
    StyleProps<typeof displayVariants> {}

export const Text = styled('span', styledOptions<'span'>())<TextProps>(
  elementVariants,
  displayVariants,
  textStates,
  textProps
);

Text.defaultProps = {
  as: 'span',
  m: 0,
};
