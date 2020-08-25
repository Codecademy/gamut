import { neg, createThemeVariant, createShadowVariant } from './utils';
import { spacing, colors } from '@codecademy/gamut-styles';

const {
  white,
  standard: { navy, yellow },
} = colors;

export const BACKGROUND_VARIANTS = {
  yellow: createThemeVariant(yellow, navy, navy),
  navy: createThemeVariant(navy, white, white),
  white: createThemeVariant(white, navy, navy),
};

export const SHADOW_VARIANTS = {
  left: createShadowVariant(
    [spacing[4], neg(spacing[4])],
    [neg(spacing[8]), spacing[8]]
  ),
  right: createShadowVariant(
    [neg(spacing[4]), neg(spacing[4])],
    [spacing[8], spacing[8]]
  ),
};
