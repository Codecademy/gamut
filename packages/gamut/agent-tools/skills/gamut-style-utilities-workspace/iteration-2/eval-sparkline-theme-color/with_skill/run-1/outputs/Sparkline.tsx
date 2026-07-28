import { Colors } from '@codecademy/gamut-styles';
import { useTheme } from '@emotion/react';
import { FC } from 'react';

export type SparklineProps = {
  /** Series of numeric values to plot, oldest first. */
  data: number[];
  /** Rendered SVG width, in pixels. */
  width?: number;
  /** Rendered SVG height, in pixels. */
  height?: number;
  /** Stroke width of the trend line, in pixels. */
  strokeWidth?: number;
  /**
   * Semantic theme color key for the trend line. Defaults to `primary` so
   * the line adapts to the active ColorMode/theme instead of a fixed hex.
   */
  color?: Colors;
};

/**
 * Builds an SVG path `d` attribute string that plots `data` as a line,
 * scaled to fit within `width` x `height`.
 */
const buildSparklinePath = (
  data: number[],
  width: number,
  height: number
): string => {
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
  const stepX = width / (data.length - 1);

  return data
    .map((value, index) => {
      const x = index * stepX;
      const y = height - ((value - min) / range) * height;
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');
};

/**
 * A minimal trend-line sparkline, drawn as a raw SVG `<path>`.
 *
 * The path's `d` and `stroke` attributes are set imperatively as SVG
 * attributes rather than through Emotion-managed CSS, so this can't be
 * themed with `css()` / `variant()` / `states()`. Instead it reads the
 * semantic color straight off the theme object via `useTheme()` — the
 * documented escape hatch for token values needed in plain JS/props
 * (charts, canvas, third-party props) — so the stroke still tracks the
 * active theme and ColorMode instead of being a hardcoded hex value.
 */
export const Sparkline: FC<SparklineProps> = ({
  data,
  width = 100,
  height = 24,
  strokeWidth = 2,
  color = 'primary',
}) => {
  const theme = useTheme();
  const stroke = theme.colors[color];

  const d = buildSparklinePath(data, width, height);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-hidden="true"
    >
      <path
        d={d}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
