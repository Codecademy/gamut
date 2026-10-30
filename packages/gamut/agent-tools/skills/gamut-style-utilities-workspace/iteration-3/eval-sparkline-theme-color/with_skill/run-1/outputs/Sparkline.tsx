import { Colors, useColorModes } from '@codecademy/gamut-styles';
import * as React from 'react';

export interface SparklineProps
  extends Omit<React.SVGProps<SVGSVGElement>, 'color' | 'points'> {
  /** Numeric values to plot, left to right. */
  points: number[];
  /** Rendered width of the SVG viewport, in px. */
  width?: number;
  /** Rendered height of the SVG viewport, in px. */
  height?: number;
  /** Thickness of the trend line, in px. */
  strokeWidth?: number;
  /**
   * Semantic (or palette) color key to draw the line in.
   * Resolved through the active theme/ColorMode, never a hardcoded hex value.
   */
  color?: Colors;
}

/**
 * Builds an SVG path `d` attribute for a simple polyline trend chart,
 * scaling `points` to fit within `width`/`height`.
 */
const buildSparklinePath = (
  points: number[],
  width: number,
  height: number
): string => {
  if (points.length === 0) return '';
  if (points.length === 1) {
    const y = height / 2;
    return `M0 ${y} L${width} ${y}`;
  }

  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const stepX = width / (points.length - 1);

  return points
    .map((value, index) => {
      const x = index * stepX;
      // Invert y so higher values are drawn nearer the top of the viewport.
      const y = height - ((value - min) / range) * height;
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');
};

/**
 * Sparkline draws a minimal inline SVG trend line.
 *
 * The line is drawn imperatively via the `<path>` `d` and `stroke`
 * attributes rather than through a styled component's CSS, so the stroke
 * color can't come from `css()`/`variant()`/`states()`. Instead it's read
 * from the design system theme in plain JS via the `useColorModes()`
 * escape hatch (see the `gamut-style-utilities` skill's `useTheme()`
 * section) — this keeps the color a semantic token that resolves through
 * the active ColorMode instead of a hardcoded hex value.
 */
export const Sparkline: React.FC<SparklineProps> = ({
  points,
  width = 120,
  height = 32,
  strokeWidth = 2,
  color = 'primary',
  ...rest
}) => {
  const [, , , getColorValue] = useColorModes();
  const strokeColor = getColorValue(color);

  const path = buildSparklinePath(points, width, height);

  return (
    <svg
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      {...rest}
    >
      <path
        d={path}
        fill="none"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};
