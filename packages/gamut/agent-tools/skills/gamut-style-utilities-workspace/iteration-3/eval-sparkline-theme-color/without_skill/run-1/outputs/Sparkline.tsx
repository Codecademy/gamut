import { Colors, isColorAlias, useColorModes } from '@codecademy/gamut-styles';
import { FC, SVGProps, useMemo } from 'react';

export interface SparklineProps extends Omit<SVGProps<SVGSVGElement>, 'color'> {
  /**
   * The sequence of numeric values to plot as a trend line, in order.
   */
  data: number[];
  /**
   * Rendered width of the sparkline, in pixels.
   */
  width?: number;
  /**
   * Rendered height of the sparkline, in pixels.
   */
  height?: number;
  /**
   * Width of the trend line stroke, in pixels.
   */
  strokeWidth?: number;
  /**
   * Theme color used for the trend line's stroke. Accepts either a raw
   * palette key (e.g. `"blue"`) or a semantic color mode alias (e.g.
   * `"primary"`, `"text"`), the same as other Gamut color props.
   */
  color?: Colors;
}

/**
 * Builds an SVG path `d` attribute string that plots `data` as a simple
 * polyline, normalized to fit within a `width` x `height` box.
 */
const buildSparklinePath = (
  data: number[],
  width: number,
  height: number
): string => {
  if (!data.length) {
    return '';
  }

  if (data.length === 1) {
    const y = height / 2;
    return `M0,${y} L${width},${y}`;
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);

  return data
    .map((value, index) => {
      const x = index * stepX;
      const y = height - ((value - min) / range) * height;
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');
};

/**
 * `Sparkline` renders a minimal trend line as a single SVG `<path>`.
 *
 * The path is drawn imperatively via its `d` and `stroke` attributes rather
 * than through styled-component CSS, so the stroke color can't be sourced
 * from a themed CSS custom property the way most Gamut components do
 * (e.g. via the `color`/`stroke` variance props or a `css({ stroke: ... })`
 * block). Instead, it resolves the color straight out of the active
 * theme/color mode with `useColorModes` (the same hook `Background` and
 * `useBarBorderColor` use), so the plain-JS `stroke` attribute always
 * reflects the current theme instead of a hardcoded hex value.
 */
export const Sparkline: FC<SparklineProps> = ({
  data,
  width = 100,
  height = 30,
  strokeWidth = 2,
  color = 'blue',
  ...rest
}) => {
  const [, activeColors, , getColorValue] = useColorModes();

  const strokeColor = useMemo(() => {
    /** If a color alias was used then look up the true color key from the active mode */
    const trueColor = isColorAlias(activeColors, color)
      ? activeColors[color]
      : color;

    return getColorValue(trueColor);
  }, [activeColors, color, getColorValue]);

  const path = useMemo(
    () => buildSparklinePath(data, width, height),
    [data, width, height]
  );

  return (
    <svg
      height={height}
      role="img"
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
