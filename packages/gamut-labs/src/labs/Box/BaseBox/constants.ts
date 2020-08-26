import { neg, createShadowOffset } from './utils';
import { spacing, colors } from '@codecademy/gamut-styles';

const {
  white,
  standard: { navy, yellow },
} = colors;

export const BOX_VARIANTS = {
  yellow: {
    background: yellow,
    shadow: navy,
    text: navy,
    border: navy,
  },
  navy: {
    background: navy,
    shadow: white,
    text: white,
    border: navy,
  },
  white: {
    background: white,
    shadow: navy,
    text: navy,
    border: navy,
  },
};

export const SHADOW_VARIANTS = {
  left: createShadowOffset(
    [spacing[4], neg(spacing[4])],
    [neg(spacing[8]), spacing[8]]
  ),
  right: createShadowOffset(
    [neg(spacing[4]), neg(spacing[4])],
    [spacing[8], spacing[8]]
  ),
};
