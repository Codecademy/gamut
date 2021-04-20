import { styledConfig, system } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';

export const typographyStyleVariants = {
  'title-1': {
    fontSize: 64,
    fontWeight: 'title',
    lineHeight: 'title',
  },
  'title-2': {
    fontSize: 44,
    fontWeight: 'title',
    lineHeight: 'title',
  },
  'title-3': {
    fontSize: 34,
    fontWeight: 'title',
    lineHeight: 'title',
  },
  'title-4': {
    fontSize: 26,
    fontWeight: 'title',
    lineHeight: 'title',
  },
  'title-5': {
    fontSize: 22,
    fontWeight: 'title',
    lineHeight: 'title',
  },
  'title-6': {
    fontSize: 20,
    fontWeight: 'title',
    lineHeight: 'title',
  },
  'p-large': {
    fontSize: 18,
    lineHeight: 'base',
  },
  'p-base': {
    fontSize: 16,
    lineHeight: 'base',
  },
  'p-small': {
    fontSize: 14,
    lineHeight: 'base',
  },
} as const;

export const typographyElementVariants = {
  h1: typographyStyleVariants['title-1'],
  h2: typographyStyleVariants['title-2'],
  h3: typographyStyleVariants['title-3'],
  h4: typographyStyleVariants['title-4'],
  h5: typographyStyleVariants['title-5'],
  h6: typographyStyleVariants['title-6'],
  p: {
    ...typographyStyleVariants['p-base'],
    fontSize: 16,
  },
  small: {
    ...typographyStyleVariants['p-small'],
    display: 'inline-block',
  },
  strong: {
    fontSize: 'inherit',
    fontWeight: 'title',
    display: 'inline-block',
  },
  code: {
    fontFamily: 'monospace',
    display: 'inline-block',
  },
  span: {
    fontSize: 'inherit',
    display: 'inline-block',
  },
  div: {},
} as const;

const displayVariants = system.variant({
  variants: typographyStyleVariants,
});

const elementVariants = system.variant({
  prop: 'as',
  variants: typographyElementVariants,
});

const textProps = variance.compose(
  system.layout,
  system.typography,
  system.color,
  system.space
);

export interface TextProps
  extends StyleProps<typeof textProps>,
    StyleProps<typeof elementVariants>,
    StyleProps<typeof displayVariants> {}

export const Text = styled('span', styledConfig)<TextProps>(
  elementVariants,
  displayVariants,
  textProps
);

Text.defaultProps = {
  as: 'span',
  m: 0,
};
