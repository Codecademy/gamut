import { PatternProps } from '@codecademy/gamut-patterns';
import { StyleProps } from '@codecademy/variance';
import { ComponentProps } from 'react';

import { Box } from '../Box';
import { WithChildrenProp } from '../utils';
import {
  cardAnchorVariants,
  cardVariants,
  hoverState,
  shadowVariants,
} from './styles';

export interface CardWrapperProps
  extends StyleProps<typeof cardVariants>,
    StyleProps<typeof shadowVariants>,
    StyleProps<typeof hoverState>,
    WithChildrenProp {
  pattern?: React.ComponentType<PatternProps>;
  isHovering?: boolean;
}

export interface BaseCardProps extends CardWrapperProps {
  href?: string;
  onClick?: () => void;
}

export type CardProps = BaseCardProps & ComponentProps<typeof Box> ;

export type CardAnchorProps = StyleProps<typeof cardAnchorVariants> &
  WithChildrenProp;
