type ThemeColors = Record<string, string>;

/**
 * The visual treatment of a surface at a single elevation state.
 * These are type aliases rather than interfaces so they keep the implicit
 * index signatures `addScale`'s constraint requires.
 */
export type ElevationStateStyles = {
  shadow: string;
  transform: string;
};

/**
 * State keys are camelCase: variance's `LiteralPaths` splits token paths on
 * `-`, so a hyphenated key like `hover-mirrored` would resolve to `never` and
 * drop out of the theme type. `hoverMirrored` is for surfaces that cast their
 * shadow to the opposite side (e.g. Card's `patternRight` shadow).
 */
export type ElevationScale = {
  rest: ElevationStateStyles;
  hover: ElevationStateStyles;
  hoverMirrored: ElevationStateStyles;
};

export type ElevationState = keyof ElevationScale;

/**
 * Elevation scales describe how a surface renders shadow and lift at rest and
 * on hover. Each theme provides its own scale via
 * `.addScale('elevation', ...)`, which passes in that theme's `colors` — so
 * `colors['shadow-primary']` resolves per theme and per color mode without
 * this file ever importing a theme (which would be a circular dependency).
 *
 * The shared return type guarantees every theme emits the same elevation
 * tokens, so lookups like `theme.elevation['hover-shadow']` are safe under
 * any theme.
 */
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
