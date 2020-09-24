import { system } from './core/system';
import { HandlerProps } from './types';

const config = {
  typography: { fontSize: { propName: 'fontSize', scale: 'fontSizes' } },
} as const;

const theme = {
  fontSizes: [1, 2, 3, 4, 5],
} as const;

export const {
  /** Grouped Config */
  groups: {
    typography,
    positioning,
    spacing,
    grid,
    flex,
    layout,
    border,
    background,
    shadow,
    colors,
  },
  handlers: { margin },

  /** Helpers */
  createVariant,
} = system(config, theme);

export type TypographyProps = HandlerProps<typeof typography>;
export type PositioningProps = HandlerProps<typeof positioning>;
export type SpacingProps = HandlerProps<typeof spacing>;
export type GridProps = HandlerProps<typeof grid>;
export type FlexProps = HandlerProps<typeof flex>;
export type LayoutProps = HandlerProps<typeof layout>;
export type BorderProps = HandlerProps<typeof border>;
export type BackgroundProps = HandlerProps<typeof background>;
export type ShadowProps = HandlerProps<typeof shadow>;
