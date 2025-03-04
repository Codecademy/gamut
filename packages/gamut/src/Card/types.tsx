import { PatternProps } from '@codecademy/gamut-patterns';
import { StyleProps } from '@codecademy/variance';
import { ComponentProps } from 'react';

import { Box } from '../Box';
import { WithChildrenProp } from '../utils';
import {
  cardVariants,
  shadowVariants,
} from './styles';

export interface CardProps
  extends StyleProps<typeof cardVariants>,
    StyleProps<typeof shadowVariants>,
    WithChildrenProp {
  pattern?: React.ComponentType<PatternProps>;
  borderRadius?: ComponentProps<typeof Box>['borderRadius'];
  isInteractive?: boolean;
}
