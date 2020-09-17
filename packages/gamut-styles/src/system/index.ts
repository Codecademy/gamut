import { compose } from './core/compose';
import {
  border as borderConfig,
  typography as typographyConfig,
  positioning as positioningConfig,
  spacing as spacingConfig,
  layout as layoutConfig,
  shadow as shadowConfig,
  flex as flexConfig,
  grid as gridConfig,
  background as backgroundConfig,
} from './props';
import { system } from './core/system';
import { HandlerProps } from './types';

/** Single Props */
export const { borderWidth, borderStyle, borderRadius, borderColor } = system(
  borderConfig
);
export const {
  fontFamily,
  fontWeight,
  fontStyle,
  fontSize,
  textAlign,
  letterSpacing,
  lineHeight,
} = system(typographyConfig);
export const { position, coordinate, zIndex } = system(positioningConfig);
export const { margin, padding } = system(spacingConfig);
export const { display, overflow, dimensions, verticalAlign } = system(
  layoutConfig
);
export const { textShadow, boxShadow } = system(shadowConfig);
export const {
  align: flexAlign,
  justify: flexJustify,
  flex: flexValue,
  flexWrap,
  flexDirection,
  flexBasis,
  order,
} = system(flexConfig);
export const {
  gridGap,
  gridItems,
  justify: gridJustify,
  align: gridAlign,
  gridPosition,
  gridAutoFlow,
} = system(gridConfig);
export const {
  backgroundImage,
  backgroundPosition,
  backgroundRepeat,
  backgroundSize,
} = system(backgroundConfig);

/** Composed  */
export const border = compose(
  borderWidth,
  borderStyle,
  borderRadius,
  borderColor
);
export type BorderProps = HandlerProps<typeof border>;

export const typography = compose(
  fontFamily,
  fontWeight,
  fontStyle,
  fontSize,
  textAlign,
  letterSpacing,
  lineHeight
);
export type Typography = HandlerProps<typeof typography>;

export const positioning = compose(position, coordinate, zIndex);
export type PositioningProps = HandlerProps<typeof position>;

export const space = compose(margin, padding);
export type SpaceProps = HandlerProps<typeof space>;

export const layout = compose(display, overflow, dimensions, verticalAlign);
export type LayoutProps = HandlerProps<typeof layout>;

export const shadow = compose(textShadow, boxShadow);
export type ShadowProps = HandlerProps<typeof shadow>;

export const flex = compose(
  flexAlign,
  flexJustify,
  flexValue,
  flexWrap,
  flexDirection,
  flexBasis,
  order
);

export type FlexProps = HandlerProps<typeof flex>;

export const grid = compose(
  gridGap,
  gridItems,
  gridJustify,
  gridAlign,
  gridPosition,
  gridAutoFlow
);
export type GridProps = HandlerProps<typeof grid>;

export const background = compose(
  backgroundImage,
  backgroundPosition,
  backgroundRepeat,
  backgroundSize
);
export type BackgroundProps = HandlerProps<typeof background>;
