import { contentWidths, variant } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const contentContainerVariants = variant({
  prop: 'size',
  defaultVariant: 'medium',
  variants: {
    medium: {
      px: [16, 32, 64, , 96],
      maxWidth: contentWidths.max,
    },
    wide: {
      px: [, , 24, 32],
    },
  },
});

export const ContentContainer = styled.div(
  contentContainerVariants,
  () => css`
    height: 100%;
    width: 100%;
    margin: 0 auto;
  `
);
