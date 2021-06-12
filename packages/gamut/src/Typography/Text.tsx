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

export const Text = styled('span', styledOptions<'span'>())<TextProps>(
  elementVariants,
  displayVariants,
  textProps
);

Text.defaultProps = {
  as: 'span',
  m: 0,
};
