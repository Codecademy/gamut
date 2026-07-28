import { Colors } from '@codecademy/gamut-styles';
import { useTheme } from '@emotion/react';
import { SVGProps, useMemo } from 'react';
import * as React from 'react';

export interface SparklineProps extends Omit<SVGProps<SVGSVGElement>, 'color'> {
  /**
   * The series of values to plot, left to right.
   */
  data: number[];
  /**
   * Pixel width of the sparkline's viewBox.
   */
  width?: number;
  /**
   * Pixel height of the sparkline's viewBox.
   */
  height?: number;
  /**
   * Width of the drawn trend line's stroke, in viewBox units.
   */
  strokeWidth?: number;
  /**
   * A semantic color token from the current theme (e.g. `primary`, `feedback-success`,
   * `feedback-error`) used for the trend line's `stroke`. Defaults to `primary` so the
   * line always tracks the active theme/color mode instead of a hardcoded hex value.
   */
  color?: Colors;
}

/**
 * Builds an SVG path `d` attribute that plots `data` as a single polyline, scaled to
 * fit within a `width` x `height` viewBox.
 */
const buildPath = (
  data: number[],
  width: number,
  height: number,
  strokeWidth: number
) => {
  if (data.length === 0) {
    return '';
  }

  // Inset the plotted line by half the stroke width so it never clips at the
  // edges of the viewBox.
  const inset = strokeWidth / 2;
  const plotWidth = Math.max(width - inset * 2, 0);
  const plotHeight = Math.max(height - inset * 2, 0);

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;

  const points = data.map((value, index) => {
    const x =
      data.length === 1
        ? inset + plotWidth / 2
        : inset + (index / (data.length - 1)) * plotWidth;
    // SVG's y-axis grows downward, so invert the normalized value.
    const normalized = range === 0 ? 0.5 : (value - min) / range;
    const y = inset + (1 - normalized) * plotHeight;

    return `${x},${y}`;
  });

  return `M${points.join(' L')}`;
};

/**
 * `Sparkline` draws a minimal, inline trend line for a series of numeric values.
 *
 * Because the trend line is drawn imperatively as an SVG `<path>` (its `d` attribute
 * is computed from `data`, not styled via CSS), the stroke color can't be set through
 * a styled component's `css`/theme props. Instead, this component reads the color
 * directly off of the active theme via emotion's `useTheme`, the same way other
 * plain-JS/prop consumers in this codebase (e.g. `RadialProgress`, `ColorMode`) look up
 * theme values outside of CSS. This guarantees the stroke always resolves to a real
 * design-system token - and updates correctly across color modes - instead of a
 * hardcoded hex value.
 */
export const Sparkline: React.FC<SparklineProps> = ({
  data,
  width = 100,
  height = 24,
  strokeWidth = 2,
  color = 'primary',
  ...props
}) => {
  const theme = useTheme();
  const strokeColor = theme.colors[color];

  const path = useMemo(
    () => buildPath(data, width, height, strokeWidth),
    [data, width, height, strokeWidth]
  );

  return (
    <svg
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      {...props}
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
