import { createContext } from 'react';

import { BarChartStyles } from './shared/types';

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
