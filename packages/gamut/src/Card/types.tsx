import { PatternProps } from '@codecademy/gamut-patterns';
import { StyleProps } from '@codecademy/variance';
import { ComponentProps } from 'react';

import { WithChildrenProp } from '../utils';
import {
  cardAnchorVariants,
  cardVariants,
  hoverState,
  shadowVariants,
} from './styles';
import { CardWrapper } from './elements';

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

export type CardProps = BaseCardProps & ComponentProps<typeof CardWrapper> ;

export type CardAnchorProps = StyleProps<typeof cardAnchorVariants> &
  WithChildrenProp;
