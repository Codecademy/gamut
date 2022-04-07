import { css, system, variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';

import { FloatingCard } from '../FloatingCard/FloatingCard';
import { ListRow } from '../List';

const AsideVariants = variant({
  base: {
    gridTemplateAreas: `'header header none'
      'subtitle subtitle none'
      'content content content'
      'none none none'
      'primaryButton secondaryButton content'`,
  },
  defaultVariant: 'default',
  variants: {
    default: {},
    yellow: { bg: 'yellow-0', borderColor: 'yellow' },
  },
});

export const AsideList = styled(List)(css({ bg: 'transparent' }));

export type AsideVariantType = StyleProps<typeof AsideVariants> &
  StyleProps<typeof system.layout>;
export const AsideContainer = styled(FloatingCard)(AsideVariants);
