import { HandlerProps, system } from '@codecademy/gamut-system';
import { Theme } from './theme';

const config = {
  typography: {
    fontSize: {
      propName: 'fontSize',
      scale: 'fontSize',
    },
    lineHeight: {
      propName: 'lineHeight',
      scale: 'lineHeight',
    },
    fontWeight: {
      propName: 'fontWeight',
      scale: 'fontWeight',
    },
    fontFamily: {
      propName: 'fontFamily',
      scale: 'fontFamily',
    },
  },
  spacing: {
    margin: {
      propName: 'margin',
      scale: 'spacing',
    },
    padding: {
      propName: 'padding',
      scale: 'spacing',
    },
  },
  colors: {
    color: {
      propName: 'color',
      scale: 'colors',
    },
    backgroundColor: {
      propName: 'backgroundColor',
      scale: 'colors',
    },
    borderColor: {
      propName: 'borderColor',
      scale: 'colors',
    },
  },
} as const;

export const {
  properties,
  propertyGroups: {
    typography,
    spacing: space,
    background,
    colors: color,
    border,
    layout,
    positioning,
    grid,
    flex,
    shadow,
  },
  variant,
} = system<typeof config, Theme>(config);

export type TypographyProps = HandlerProps<typeof typography>;
export type SpaceProps = HandlerProps<typeof space>;
export type BackgroundProps = HandlerProps<typeof background>;
export type ColorProps = HandlerProps<typeof color>;
export type BorderProps = HandlerProps<typeof border>;
export type LayoutProps = HandlerProps<typeof layout>;
export type PositioningProps = HandlerProps<typeof positioning>;
export type GridProps = HandlerProps<typeof grid>;
export type FlexProps = HandlerProps<typeof flex>;
export type ShadowProps = HandlerProps<typeof shadow>;
