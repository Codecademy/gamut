import { createContext } from 'react';

import { BarChartStyles } from './shared/types';

export interface BarChartContextProps {
  minRange: number;
  maxRange: number;
  xScale: number;
  unit: string;
  styleConfig: Required<BarChartStyles>;
  animate: boolean;
  widestLeftLabelWidth: number | null;
  setWidestLeftLabelWidth: (width: number) => void;
  widestRightLabelWidth: number | null;
  setWidestRightLabelWidth: (width: number) => void;
  isMeasuring: boolean;
}

const defaultStyleConfig: Required<BarChartStyles> = {
  textColor: 'text',
  foregroundBarColor: 'feedback-warning',
  backgroundBarColor: 'background-primary',
  seriesOneLabel: 'text-secondary',
  seriesTwoLabel: 'primary',
};

export const BarChartContext = createContext<BarChartContextProps>({
  minRange: 0,
  maxRange: 100,
  xScale: 10,
  unit: '',
  styleConfig: defaultStyleConfig,
  animate: false,
  widestLeftLabelWidth: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setWidestLeftLabelWidth: () => {
    // No-op: default context value
  },
  widestRightLabelWidth: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setWidestRightLabelWidth: () => {
    // No-op: default context value
  },
  isMeasuring: true,
});

BarChartContext.displayName = 'BarChartContext';

export const BarChartProvider = BarChartContext.Provider;
