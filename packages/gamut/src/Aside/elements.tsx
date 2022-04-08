import { states, system, variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';

import { FloatingCard } from '../FloatingCard/FloatingCard';

const AsideVariants = variant({
  base: {
    gridTemplateAreas: `'header header none'
      'subtitle subtitle none'
      'content content content'
      'none none none'
      'primaryButton secondaryButton content'`,
    '&:hover': {
      outline: '5px double currentColor',
    },
  },
  defaultVariant: 'default',
  variants: {
    default: {},
    yellow: { bg: 'yellow-0', borderColor: 'yellow', color: 'yellow' },
  },
});

const AsideState = states({
  attentionPlease: {
    borderStyle: 'ridge',
    borderWidth: '5px',
  },
});

export interface AsideVariantType
  extends StyleProps<typeof AsideVariants>,
    StyleProps<typeof AsideState>,
    StyleProps<typeof system.layout> {}

export const AsideContainer = styled(FloatingCard)(AsideVariants, AsideState);
