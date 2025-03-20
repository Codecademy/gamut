import { PatternProps } from '@codecademy/gamut-patterns';
import { StyleProps } from '@codecademy/variance';
import { ComponentProps } from 'react';

import { Box } from '../Box';
import { WithChildrenProp } from '../utils';
import { DynamicCardWrapper } from './elements';
import { cardVariants, shadowVariants } from './styles';

export interface CardWrapperProps
  extends StyleProps<typeof cardVariants>,
    StyleProps<typeof shadowVariants>,
    WithChildrenProp {
  borderRadius?: ComponentProps<typeof Box>['borderRadius'];
  /** *
   * Optional prop to provide a Card with styling to indicate if is interactive
   * (e.g. a shadow hover effect and 'md' border radius).
   */
  isInteractive?: boolean;
  /** *
   * Optional prop to assign a Pattern other than CheckerDense
   */
  pattern?: React.ComponentType<PatternProps>;
}

export type CardProps = Omit<
  React.ComponentProps<typeof DynamicCardWrapper>,
  'bg'
>;
