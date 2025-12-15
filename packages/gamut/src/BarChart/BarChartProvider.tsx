import { createContext, useContext, useMemo } from 'react';

import { BarChartStyles } from './types';

export interface BarChartContextProps {
  minRange: number;
  maxRange: number;
  xScale: number;
  unit: string;
  styleConfig: Required<BarChartStyles>;
  animate: boolean;
}

const defaultStyleConfig: Required<BarChartStyles> = {
  textColor: 'text',
  foregroundBarColor: 'feedback-warning',
  backgroundBarColor: 'background-primary',
};

export const BarChartContext = createContext<BarChartContextProps>({
  minRange: 0,
  maxRange: 100,
  xScale: 10,
  unit: '',
  styleConfig: defaultStyleConfig,
  animate: false,
});

BarChartContext.displayName = 'BarChartContext';

export const BarChartProvider = BarChartContext.Provider;

export function useBarChartContext() {
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
