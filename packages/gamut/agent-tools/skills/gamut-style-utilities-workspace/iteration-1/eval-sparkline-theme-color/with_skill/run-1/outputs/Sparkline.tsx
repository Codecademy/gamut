import { useTheme } from '@emotion/react';
import * as React from 'react';

export type SparklinePoint = number;

export type SparklineProps = {
  /**
   * Ordered list of numeric values to plot as a trend line.
   */
  data: SparklinePoint[];
  /**
   * Rendered width of the SVG viewport.
   */
  width?: number;
  /**
   * Rendered height of the SVG viewport.
   */
  height?: number;
  /**
   * Semantic color token used for the trend line's stroke.
   * Must be a key of the active theme's `colors` map (e.g. 'primary',
   * 'text', 'feedback-positive') so the line tracks the theme and
   * ColorMode instead of a hardcoded hex value.
   */
  strokeColor?: string;
  /**
   * Stroke width, in px, of the trend line path.
   */
  strokeWidth?: number;
};

/**
 * Builds an SVG path `d` attribute string that plots `data` as a single
 * polyline, scaled to fit within `width`x`height`.
 */
const buildPath = (data: number[], width: number, height: number) => {
  if (data.length === 0) {
    return '';
  }

  if (data.length === 1) {
    const y = height / 2;
    return `M0 ${y} L${width} ${y}`;
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);

  return data
    .map((value, index) => {
      const x = index * step;
      // Flip vertically since SVG y-coordinates increase downward.
      const y = height - ((value - min) / range) * height;
      return `${index === 0 ? 'M' : 'L'}${x} ${y}`;
    })
    .join(' ');
};

/**
 * Draws a minimal trend line for a series of numeric values.
 *
 * The line is drawn imperatively via an SVG `<path>` `d` attribute and
 * `stroke` attribute rather than through Emotion-managed CSS, so the
 * stroke color can't be set with `css()`/`variant()`/`states()`. Instead,
 * this reads the color straight off the theme with the `useTheme()`
 * escape hatch (see the `gamut-style-utilities` skill) and looks it up by
 * semantic token so the sparkline still tracks the active theme and
 * ColorMode instead of a hardcoded hex value.
 */
export const Sparkline: React.FC<SparklineProps> = ({
  data,
  width = 100,
  height = 24,
  strokeColor = 'primary',
  strokeWidth = 2,
}) => {
  const theme = useTheme();
  const stroke = theme.colors[strokeColor] ?? strokeColor;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Sparkline trend chart"
    >
      <path
        d={buildPath(data, width, height)}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
