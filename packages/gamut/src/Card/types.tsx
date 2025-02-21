import { PatternProps } from '@codecademy/gamut-patterns';
import { StyleProps } from '@codecademy/variance';

import { WithChildrenProp } from '../utils';
import { cardAnchorVariants, cardVariants, hoverState, shadowVariants } from './styles';

export interface CardWrapperProps
  extends StyleProps<typeof cardVariants>,
  StyleProps<typeof shadowVariants>,
  StyleProps<typeof hoverState>,
  WithChildrenProp {
    pattern?: React.ComponentType<PatternProps>;
    isHovering?: boolean;
  }

export interface CardProps extends CardWrapperProps {
  href?: string;
  onClick?: () => void;
}

export type CardAnchorProps = StyleProps<typeof cardAnchorVariants> & WithChildrenProp;
