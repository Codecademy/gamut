import * as PropConfig from './props';
import { createSystem } from './core/system';
import { HandlerProps } from './types';

export const {
  border: {
    handlers: { borderColor, borderRadius, borderStyle, borderWidth },
    composed: border,
  },
  typography: {
    handlers: {
      fontFamily,
      fontSize,
      fontStyle,
      fontWeight,
      lineHeight,
      letterSpacing,
      textAlign,
    },
    composed: typography,
  },
  positioning: {
    handlers: { position, zIndex, coordinate },
    composed: positioning,
  },
  spacing: {
    handlers: { margin, padding },
    composed: spacing,
  },
  layout: {
    handlers: { display, overflow, dimensions },
    composed: layout,
  },
  shadow: {
    handlers: { textShadow, boxShadow },
    composed: shadow,
  },
  flex: {
    handlers: {
      flex: flexValue,
      flexBasis,
      flexDirection,
      flexWrap,
      justify: flexJustify,
      align: flexAlign,
    },
    composed: flex,
  },
  grid: {
    handlers: {
      gridAutoFlow,
      gridGap,
      gridItems,
      gridPosition,
      justify: gridJustify,
      align: gridAlign,
    },
    composed: grid,
  },
  background: {
    handlers: {
      backgroundImage,
      backgroundPosition,
      backgroundRepeat,
      backgroundSize,
    },
    composed: background,
  },
} = createSystem(PropConfig);

/** Border */
export type BorderProps = HandlerProps<typeof border>;
export type BorderColorPops = HandlerProps<typeof borderColor>;
export type BorderRadiusProps = HandlerProps<typeof borderRadius>;
export type BorderWidthProps = HandlerProps<typeof borderWidth>;
export type BorderStyleProps = HandlerProps<typeof borderStyle>;

/** Typography */
export type TypographyProps = HandlerProps<typeof typography>;

/** Positioning */
export type PositioningProps = HandlerProps<typeof positioning>;

/** Spacing */
export type SpacingProps = HandlerProps<typeof spacing>;

/** Layout */
export type LayoutProps = HandlerProps<typeof layout>;

/** Shadow */
export type ShadowProps = HandlerProps<typeof shadow>;

/** Flex */
export type FlexProps = HandlerProps<typeof flex>;

/** Grid */
export type GridProps = HandlerProps<typeof grid>;

/** Background */
export type BackgroundProps = HandlerProps<typeof background>;
