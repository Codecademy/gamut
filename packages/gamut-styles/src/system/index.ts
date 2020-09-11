import { border, typography, positioning, spacing, layout } from './props';
import { system } from './system';

export const { borderWidth, borderStyle, borderRadius, borderColor } = system(
  border
);
export const {
  fontFamily,
  fontWeight,
  fontStyle,
  fontSize,
  textAlign,
  letterSpacing,
  lineHeight,
} = system(typography);
export const { position, coordinate, zIndex } = system(positioning);
export const { margin, padding } = system(spacing);
export const { display, overflow, dimensions } = system(layout);
