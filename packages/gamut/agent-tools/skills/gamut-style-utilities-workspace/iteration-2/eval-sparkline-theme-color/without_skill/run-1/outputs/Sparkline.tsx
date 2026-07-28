import { Colors } from '@codecademy/gamut-styles';
import { useTheme } from '@emotion/react';
import { FunctionComponent, SVGProps } from 'react';

export type SparklineProps = Omit<SVGProps<SVGSVGElement>, 'stroke'> & {
  /** Numeric data points to plot, in chronological order. */
  data: number[];
  /** Width of the SVG viewport, in pixels. */
  width?: number;
  /** Height of the SVG viewport, in pixels. */
  height?: number;
  /** Width of the trend line stroke, in pixels. */
  strokeWidth?: number;
  /**
   * Gamut theme color token used for the trend line.
   *
   * The line is drawn imperatively via an SVG `<path>` `d`/`stroke`
   * attribute rather than through styled-component CSS, so the color can't
   * be applied with a system prop. Instead we resolve it from the active
   * theme with `useTheme()` and pass the resulting value straight to the
   * `stroke` attribute, matching how the rest of Gamut reads theme values
   * in plain JS/props (e.g. `theme.colors['border-primary']` in
   * `Card/styles.tsx`) rather than hardcoding a hex value.
   */
  color?: Colors;
};

/**
 * Renders a minimal inline trend line as an SVG `<path>`.
 *
 * `Sparkline` is intentionally unstyled beyond its stroke: sizing and
 * positioning are left to the consumer via standard `SVGProps`.
 */
export const Sparkline: FunctionComponent<SparklineProps> = ({
  data,
  width = 100,
  height = 24,
  strokeWidth = 2,
  color = 'primary',
  ...props
}) => {
  const theme = useTheme();
  // Resolve the design-system color token to its underlying value here,
  // since the `stroke` attribute below is a plain SVG attribute, not CSS,
  // and can't consume a theme token directly.
  const strokeColor = theme.colors[color];

  return (
    <svg
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      {...props}
    >
      <title>Sparkline</title>
      <path
        d={buildSparklinePath(data, width, height, strokeWidth)}
        fill="none"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

/**
 * Builds an SVG path `d` attribute plotting `data` as a series of line
 * segments scaled to fit within `width` x `height`, inset by half the
 * stroke width so the line isn't clipped at the viewport edges.
 */
function buildSparklinePath(
  data: number[],
  width: number,
  height: number,
  strokeWidth: number
): string {
  if (!data.length) {
    return '';
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const inset = strokeWidth / 2;
  const innerWidth = width - inset * 2;
  const innerHeight = height - inset * 2;
  const stepX = data.length > 1 ? innerWidth / (data.length - 1) : 0;

  return data
    .map((value, index) => {
      const x = inset + index * stepX;
      const y = inset + innerHeight - ((value - min) / range) * innerHeight;

      return `${index === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');
}
