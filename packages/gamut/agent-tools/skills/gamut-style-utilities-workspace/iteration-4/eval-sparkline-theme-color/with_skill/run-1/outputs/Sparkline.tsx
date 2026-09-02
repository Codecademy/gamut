import { Colors, isColorAlias, useColorModes } from '@codecademy/gamut-styles';
import React from 'react';

export type SparklinePoint = { x: number; y: number };

export interface SparklineProps {
  /**
   * The trend line points to render, already scaled to the SVG's
   * viewBox coordinate space.
   */
  points: SparklinePoint[];
  /**
   * A semantic color alias (e.g. "primary", "text") or a raw palette key
   * (e.g. "hyper-500"). Defaults to "primary".
   */
  color?: Colors;
  strokeWidth?: number;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Builds an SVG path `d` attribute string ("M x0 y0 L x1 y1 L x2 y2 ...")
 * from a list of points.
 */
const buildPathData = (points: SparklinePoint[]): string =>
  points
    .map(({ x, y }, index) => `${index === 0 ? 'M' : 'L'}${x} ${y}`)
    .join(' ');

/**
 * A minimal trend line drawn imperatively via an SVG `<path>`. Because the
 * stroke color is set via the `stroke` attribute (not CSS managed by
 * Emotion), it can't be styled with `css()`/`variant()`/`states()` — the
 * theme color must instead be resolved to a real value in plain JS.
 *
 * `useColorModes()`'s `getColorValue()` only resolves raw palette keys
 * (e.g. "hyper-500"), not semantic aliases (e.g. "primary"), so aliases are
 * resolved to their raw key via `isColorAlias`/`activeColors` first. See
 * `packages/gamut-styles/src/Background.tsx` for the canonical version of
 * this lookup chain.
 */
export const Sparkline: React.FC<SparklineProps> = ({
  points,
  color = 'primary',
  strokeWidth = 2,
  width = 100,
  height = 24,
  className,
}) => {
  const [, activeColors, , getColorValue] = useColorModes();

  const strokeColor = isColorAlias(activeColors, color)
    ? getColorValue(activeColors[color])
    : getColorValue(color);

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      role="img"
      aria-hidden="true"
    >
      <path
        d={buildPathData(points)}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
