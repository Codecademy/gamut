import { contentWidths, variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { Box } from '../Box';

const contentContainerVariants = variant({
  prop: 'size',
  defaultVariant: 'medium',
  base: {
    height: '100%',
    width: '100%',
    my: 0,
    mx: 'auto',
  },
  variants: {
    small: {
      px: 0,
      mx: 0,
      maxWidth: contentWidths.max,
    },
    medium: {
      px: [16, 32, 64, , 96],
      maxWidth: contentWidths.max,
    },
    wide: {
      px: [, , 24, 32],
    },
  },
});

export const ContentContainer = styled(Box)(contentContainerVariants);
