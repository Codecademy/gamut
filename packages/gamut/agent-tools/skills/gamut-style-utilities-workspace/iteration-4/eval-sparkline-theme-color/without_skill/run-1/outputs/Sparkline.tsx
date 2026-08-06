import { useTheme } from '@emotion/react';
import { SVGProps } from 'react';
import * as React from 'react';

export interface SparklineProps
  extends Omit<SVGProps<SVGSVGElement>, 'points'> {
  /**
   * The numeric series to plot as a trend line.
   */
  points: number[];
  /**
   * Rendered SVG width. Defaults to `100`.
   */
  width?: number;
  /**
   * Rendered SVG height. Defaults to `32`.
   */
  height?: number;
  /**
   * Width of the drawn trend line stroke.
   */
  strokeWidth?: number;
  /**
   * Optional override for the trend line color. Defaults to the current
   * theme's primary color (`theme.colors.primary`) so the sparkline stays
   * on-brand and respects light/dark color modes without any hardcoded
   * hex values.
   */
  strokeColor?: string;
}

/**
 * Builds an SVG path `d` attribute string that plots `points` as a single
 * polyline, scaled to fit within the given `width`/`height` viewport.
 */
const buildPathFromPoints = (
  points: number[],
  width: number,
  height: number
) => {
  if (points.length === 0) {
    return '';
  }

  if (points.length === 1) {
    const y = height / 2;
    return `M 0 ${y} L ${width} ${y}`;
  }

  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const step = width / (points.length - 1);

  return points
    .map((point, index) => {
      const x = index * step;
      const y = height - ((point - min) / range) * height;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');
};

/**
 * Sparkline draws a minimal trend line as an SVG `<path>`. Because the
 * path is drawn imperatively via the `d` and `stroke` attributes rather
 * than through styled-component CSS, the stroke color is read directly
 * from the active `@emotion/react` theme (via `useTheme`) instead of being
 * hardcoded, so the line automatically matches the current Gamut theme
 * and color mode.
 */
export const Sparkline: React.FC<SparklineProps> = ({
  points,
  width = 100,
  height = 32,
  strokeWidth = 2,
  strokeColor,
  ...props
}) => {
  const theme = useTheme();
  const stroke = strokeColor ?? theme.colors.primary;
  const d = buildPathFromPoints(points, width, height);

  return (
    <svg
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      {...props}
    >
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export default Sparkline;
