import { useContext, useMemo } from 'react';

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
