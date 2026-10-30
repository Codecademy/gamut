import {
  css,
  fontSmoothPixel,
  states,
  timing,
  variant,
} from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';

import { Box } from '../../Box';
import { InteractiveSelectors } from '../../ButtonBase/ButtonBase';
import {
  tooltipArrowHeight,
  tooltipBgColor,
  tooltipVariantStyles,
} from '../shared/styles/styles';
import { TipPlacementComponentProps } from '../shared/types';

const textColor = 'secondary';

export const infoButtonStyles = css({
  borderColor: 'transparent',
  color: textColor,
  height: 24,
  width: 24,
  [InteractiveSelectors.HOVER]: {
    color: textColor,
    bg: 'background-hover',
  },
  [InteractiveSelectors.FOCUS_VISIBLE]: {
    color: textColor,
  },
  [InteractiveSelectors.OUTLINE]: {
    borderColor: textColor,
  },
  [InteractiveSelectors.ACTIVE]: {
    color: 'text',
  },
  [InteractiveSelectors.DISABLED]: {
    color: 'text-disabled',
    bg: 'transparent',
  },
});

export type InfoButtonStatesProps = StyleProps<typeof infoButtonStates>;

export const infoTipAlignmentVariants = variant({
  prop: 'alignment',
  base: {
    bg: 'transparent',
    fontSmoothPixel,
    display: 'flex',
    transition: `opacity ${timing.fast}`,
    transitionDelay: `${timing.fast}`,
    position: 'absolute',
    '&::after': {
      bg: tooltipBgColor,
      content: '""',
      display: 'block',
      height: `${tooltipArrowHeight}`,
      position: 'absolute',
      width: `${tooltipArrowHeight}`,
      borderStyle: 'solid',
    },
  },
  variants: tooltipVariantStyles,
});

export const infoButtonStates = states({
  active: { bg: 'background-selected' },
});

export const infoVisibilityStates = states({
  hideTip: { visibility: 'hidden', opacity: 0 },
});

export const InfoTipContainer = styled(Box)<
  Pick<TipPlacementComponentProps, 'alignment'> &
    StyleProps<typeof infoVisibilityStates>
>`
  ${infoVisibilityStates}
  ${infoTipAlignmentVariants}
`;
