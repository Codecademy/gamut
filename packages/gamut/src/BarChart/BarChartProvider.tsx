import { createContext } from 'react';

import {
  BarChartTranslations,
  defaultBarChartTranslations,
} from './shared/translations';
import { BarChartStyles } from './shared/types';

export interface BarChartContextProps {
  maxScaleValue: number;
  scaleInterval: number;
  unit: string;
  styleConfig: Required<BarChartStyles>;
  animate: boolean;
  widestCategoryLabelWidth: number | null;
  setWidestCategoryLabelWidth: (width: number) => void;
  widestTotalValueLabelWidth: number | null;
  setWidestTotalValueLabelWidth: (width: number) => void;
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
  maxScaleValue: 100,
  scaleInterval: 10,
  unit: '',
  styleConfig: defaultStyleConfig,
  animate: false,
  widestCategoryLabelWidth: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setWidestCategoryLabelWidth: () => {},
  widestTotalValueLabelWidth: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setWidestTotalValueLabelWidth: () => {
    // No-op: default context value
  },
  isMeasuring: true,
  translations: defaultBarChartTranslations,
});

export const BarChartProvider = BarChartContext.Provider;
