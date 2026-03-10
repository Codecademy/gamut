import { createContext } from 'react';

import {
  BarChartTranslations,
  defaultBarChartTranslations,
} from './shared/translations';
import { BarChartStyles } from './shared/types';

export interface BarChartContextProps {
  maxRange: number;
  scaleInterval: number;
  unit: string;
  styleConfig: Required<BarChartStyles>;
  animate: boolean;
  widestLeftLabelWidth: number | null;
  setWidestLeftLabelWidth: (width: number) => void;
  widestRightLabelWidth: number | null;
  setWidestRightLabelWidth: (width: number) => void;
  isMeasuring: boolean;
  translations: BarChartTranslations;
}

export const defaultStyleConfig: Required<BarChartStyles> = {
  textColor: 'text',
  seriesOneBarColor: 'text',
  seriesTwoBarColor: 'primary',
  seriesOneLabel: 'text-secondary',
  seriesTwoLabel: 'primary',
};

export const BarChartContext = createContext<BarChartContextProps>({
  maxRange: 100,
  scaleInterval: 10,
  unit: '',
  styleConfig: defaultStyleConfig,
  animate: false,
  widestLeftLabelWidth: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setWidestLeftLabelWidth: () => {},
  widestRightLabelWidth: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setWidestRightLabelWidth: () => {
    // No-op: default context value
  },
  isMeasuring: true,
  translations: defaultBarChartTranslations,
});

export const BarChartProvider = BarChartContext.Provider;
