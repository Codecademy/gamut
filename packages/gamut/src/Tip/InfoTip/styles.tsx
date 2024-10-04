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
import { ButtonSelectors } from '../../ButtonBase/ButtonBase';
import {
  tooltipArrowHeight,
  tooltipBackgroundColor,
  tooltipVariantStyles,
} from '../shared/styles';
import { TipPlacementComponentProps } from '../shared/types';

const textColor = 'secondary';

export const infoButtonStyles = css({
  borderColor: 'transparent',
  color: textColor,
  height: 24,
  width: 24,
  [ButtonSelectors.HOVER]: {
    color: textColor,
    bg: 'background-hover',
  },
  [ButtonSelectors.FOCUS_VISIBLE]: {
    color: textColor,
  },
  [ButtonSelectors.OUTLINE]: {
    borderColor: textColor,
  },
  [ButtonSelectors.ACTIVE]: {
    color: 'text',
  },
  [ButtonSelectors.DISABLED]: {
    color: 'text-disabled',
    bg: 'transparent',
  },
});

export type InfoButtonStatesProps = StyleProps<typeof infoButtonStates>;

export const newInfoTipAlignmentVariants = variant({
  prop: 'alignment',
  base: {
    bg: 'transparent',
    fontSmoothPixel,
    display: 'flex',
    transition: `opacity ${timing.fast}`,
    transitionDelay: `${timing.fast}`,
    position: 'absolute',
    '&::after': {
      bg: tooltipBackgroundColor,
      content: '""',
      display: 'block',
      height: `${tooltipArrowHeight}`,
      position: 'absolute',
      transform: 'rotate(45deg)',
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
  ${newInfoTipAlignmentVariants}
`;
