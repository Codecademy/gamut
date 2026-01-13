import { GamutIconProps } from '@codecademy/gamut-icons';
import { ColorAlias } from '@codecademy/gamut-styles';
import { ComponentProps, HTMLProps } from 'react';

import { ButtonProps } from '../../Button';
import { Text } from '../../Typography/Text';
import { HeadingTags } from '../../Typography/types';

type titleType =
  | string
  | {
      as?: HeadingTags;
      title: string;
      variant?: ComponentProps<typeof Text>['variant'];
    };
type BarChartAriaLabel = {
  title: titleType;
  'aria-labelledby'?: never;
  hideTitle?: boolean;
};

type BarChartAriaLabelledBy = {
  title?: never;
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
  /** Color for the series one label (first right label when stacked, or displayValue when not stacked). Defaults to 'text' */
  seriesOneLabel?: ColorAlias;
  /** Color for the series two label (displayValue when stacked). Defaults to 'text' */
  seriesTwoLabel?: ColorAlias;
};

type BarPropsBase = {
  /** Label displayed on the y-axis for this bar */
  yLabel: string;
  /** The foreground/progress bar value (always shown) */
  seriesOneValue: number;
  /** The background/total bar value (optional - creates stacked effect when provided) */
  seriesTwoValue?: number;
  /** Optional gamut-icon to display next to the label */
  icon?: React.ComponentType<GamutIconProps>;
};

type BarPropsWithoutInteraction = BarPropsBase & {
  onClick?: never;
  href?: never;
};

type BarPropsWithInteraction = BarPropsBase & {
  onClick?: ButtonProps['onClick'];
  href?: HTMLProps<HTMLAnchorElement>['href'];
  'aria-label': string;
};

export type BarProps = BarPropsWithoutInteraction | BarPropsWithInteraction;

export type BarChartProps = BarChartLabel & {
  /** Whether to animate bars on mount */
  animate?: boolean;
  /** Array of bar data to render */
  barValues: BarProps[];
  /** Figure caption for the BarChart. This should be a summary of the information or the overall takeaway of the information in the chart */
  description: string;
  /** Hides the visual figcaption */
  hideDescription?: boolean;
  /** Hides the visual title for the chart UL */
  hideTitle?: boolean;
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
