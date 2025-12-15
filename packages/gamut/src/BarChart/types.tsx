import { ColorAlias } from '@codecademy/gamut-styles';
import { GamutIconProps } from '@codecademy/gamut-icons';
import { HTMLProps } from 'react';

import { ButtonProps } from '../Button';

type BarChartAriaLabel = {
  'aria-label': string;
  'aria-labelledby'?: never;
};

type BarChartAriaLabelledBy = {
  'aria-label'?: never;
  'aria-labelledby': string;
};

type BarChartLabel = BarChartAriaLabel | BarChartAriaLabelledBy;

export type BarChartStyles = {
  /** Color for text labels. Defaults to 'text' */
  textColor?: ColorAlias;
  /** Color for the foreground/progress bar. Defaults to 'feedback-warning' */
  foregroundBarColor?: ColorAlias;
  /** Color for the background/total bar. Defaults to 'paleBlue' */
  backgroundBarColor?: ColorAlias;
};

export type BarProps = {
  /** Label displayed on the y-axis for this bar */
  yLabel: string;
  /** The foreground/progress bar value (always shown) */
  seriesOneValue: number;
  /** The background/total bar value (optional - creates stacked effect when provided) */
  seriesTwoValue?: number;
  /** Optional icon to display next to the label */
  icon?: React.ComponentType<GamutIconProps>;
  /** Click handler - makes row interactive as a button */
  onClick?: ButtonProps['onClick'];
  /** Link href - makes row interactive as an anchor */
  href?: HTMLProps<HTMLAnchorElement>['href'];
};

export type BarChartProps = BarChartLabel & {
  /** Whether to animate bars on mount */
  animate?: boolean;
  /** Array of bar data to render */
  barValues: BarProps[];
  /** Maximum value for the x-axis scale */
  maxRange: number;
  /** Minimum value for the x-axis scale (usually 0) */
  minRange: number;
  /** Sort order for bars */
  order?: 'ascending' | 'descending';
  /** Property to sort bars by */
  sortBy?: 'label' | 'value' | 'none';
  /** Unit label to display (e.g., "XP") */
  unit?: string;
  /** Style configuration for colors */
  styleConfig?: BarChartStyles;
  /** Interval for x-axis scale markers */
  xScale?: number;
};
