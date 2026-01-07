import {
  ColorModeShape,
  Colors,
  useColorModes,
} from '@codecademy/gamut-styles';
import { getContrast } from 'polished';
import { useCallback, useContext, useMemo } from 'react';

import { BarChartContext, BarChartContextProps } from '../BarChartProvider';
import { BarChartStyles } from '../shared/types';
import { calculatePositionPercent, getLabel } from './index';

export interface LabelPosition {
  value: number;
  positionPercent: number;
}

const defaultStyleConfig: Required<BarChartStyles> = {
  textColor: 'text',
  foregroundBarColor: 'feedback-warning',
  backgroundBarColor: 'background-primary',
};

/**
 * Hook that calculates label positions for a given range and count
 * Returns an array of { value, positionPercent } objects
 */
export const useLabelPositions = ({
  min,
  max,
  count,
}: {
  min: number;
  max: number;
  count: number;
}): LabelPosition[] => {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const value = getLabel({ labelCount: count, labelIndex: i, min, max });
        const positionPercent = calculatePositionPercent({ value, min, max });
        return { value, positionPercent };
      }),
    [min, max, count]
  );
};

export function useBarChartContext(): BarChartContextProps {
  return useContext(BarChartContext);
}

export interface UseBarChartOptions {
  minRange: number;
  maxRange: number;
  xScale?: number;
  unit?: string;
  styleConfig?: BarChartStyles;
  animate?: boolean;
}

export function useBarChart({
  minRange,
  maxRange,
  xScale,
  unit = '',
  styleConfig,
  animate = false,
}: UseBarChartOptions) {
  return useMemo(
    () => ({
      minRange,
      maxRange,
      xScale: xScale ?? Math.ceil((maxRange - minRange) / 5),
      unit,
      styleConfig: {
        ...defaultStyleConfig,
        ...styleConfig,
      },
      animate,
    }),
    [minRange, maxRange, xScale, unit, styleConfig, animate]
  );
}

/**
 * Checks if a color is a color alias (exists in the color mode shape)
 */
const isColorAlias = (
  mode: ColorModeShape,
  color: Colors
): color is keyof ColorModeShape => {
  return Object.keys(mode).includes(color);
};

/**
 * Hook that returns a function to get the highest contrast border color
 * (white or navy-900) for a given background color.
 *
 * Similar to the Background component, this resolves color aliases and
 * compares contrast ratios to determine the best border color.
 *
 * @returns A function that takes a background color and returns either 'white' or 'navy-900'
 */
export function useBarBorderColor() {
  const [active, activeColors, , getColorValue] = useColorModes();

  const getBorderColor = useCallback(
    (bg: Colors): 'white' | 'navy-900' => {
      /** If a color alias was used then look up the true color key from the active mode */
      const trueColor = isColorAlias(activeColors, bg) ? activeColors[bg] : bg;

      const backgroundColor = getColorValue(trueColor);
      const whiteContrast = getContrast(
        getColorValue('white'),
        backgroundColor
      );
      const navyContrast = getContrast(
        getColorValue('navy-900'),
        backgroundColor
      );

      return whiteContrast > navyContrast ? 'white' : 'navy-900';
    },
    [activeColors, getColorValue]
  );

  return getBorderColor;
}
