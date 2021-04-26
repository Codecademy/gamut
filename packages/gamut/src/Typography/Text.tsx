import { styledConfig, system } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';

import { typographyElementVariants, typographyStyleVariants } from './variants';

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
