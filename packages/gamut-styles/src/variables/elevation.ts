type ThemeColors = Record<string, string>;

export type ElevationStateStyles = {
  shadow: string;
  transform: string;
};

export type ElevationScale = {
  rest: ElevationStateStyles;
  hover: ElevationStateStyles;
  hoverMirrored: ElevationStateStyles;
};

export type ElevationState = keyof ElevationScale;

export type ElevationScaleFactory = (theme: {
  colors: ThemeColors;
}) => ElevationScale;

export const coreElevation: ElevationScaleFactory = ({ colors }) => {
  const shadowPrimary = colors['shadow-primary'];
  const offset = 8;
  const lift = 4;
  const shadow = (x: number) => `${x}px ${offset}px 0 0 ${shadowPrimary}`;

  return {
    rest: { shadow: `0 0 0 0 ${shadowPrimary}`, transform: 'none' },
    hover: {
      shadow: shadow(-offset),
      transform: `translate(${lift}px, -${lift}px)`,
    },
    hoverMirrored: {
      shadow: shadow(offset),
      transform: `translate(-${lift}px, -${lift}px)`,
    },
  };
};

export const percipioElevation: ElevationScaleFactory = ({ colors }) => {
  const shadowPrimary = colors['shadow-primary'];
  const shadowSecondary = colors['shadow-secondary'];
  const hover = `0 1px 4px 0 ${shadowPrimary}, 0 2px 11px 0 ${shadowSecondary}`;

  return {
    rest: {
      shadow: `0 1px 4px 0 ${shadowPrimary}, 0 2px 7px 0 ${shadowPrimary}`,
      transform: 'none',
    },
    hover: { shadow: hover, transform: 'none' },
    hoverMirrored: { shadow: hover, transform: 'none' },
  };
};
