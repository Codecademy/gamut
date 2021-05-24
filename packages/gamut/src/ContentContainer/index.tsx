import { contentWidths, system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

const contentContainerVariants = system.variant({
  prop: 'size',
  defaultVariant: 'medium',
  base: {
    height: '100%',
    width: '100%',
    my: 0,
    mx: 'auto',
  },
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

export const ContentContainer = styled.div(contentContainerVariants);
