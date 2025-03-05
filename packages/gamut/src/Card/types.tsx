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
  pattern?: React.ComponentType<PatternProps>;
  borderRadius?: ComponentProps<typeof Box>['borderRadius'];
  isInteractive?: boolean;
}

export type CardProps = Omit<
  React.ComponentProps<typeof DynamicCardWrapper>,
  'bg'
>;
