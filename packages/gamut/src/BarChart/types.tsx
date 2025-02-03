import { GamutIconProps } from '@codecademy/gamut-icons';
import { HTMLProps } from 'react';

import { BoxProps } from '../Box';
import { ButtonProps } from '../Button';

type BarChartAriaLabel = {
  'aria-label': string;
  'aria-labelledby'?: never;
};

type BarChartAriaLabelledBy = {
  'aria-label': never;
  'aria-labelledby'?: string;
};

type BarChartLabel = BarChartAriaLabel | BarChartAriaLabelledBy;

type BarChartStyles = {
  textColor?: Pick<BoxProps, 'color'>; // text default
  foregroundBarColor?: Pick<BoxProps, 'color'>; // text default
  backgroundBarColors?: Pick<BoxProps, 'color'>; // primary default
};

type BarProps = {
  yLabel: string;
  // The foreground stacked bar
  startingValue: number;
  // The background bar
  endingValue?: number;
  // The actual type is in Gamut
  icon?: React.ComponentType<GamutIconProps>;
  // onClick
  onClick?: ButtonProps['onClick'];
  // href
  href?: HTMLProps<HTMLAnchorElement>['href'];
};
export type BarChartProps = BarChartLabel & {
  // goes in hook
  animate?: boolean;
  barValues: BarProps[];
  // goes in hook
  maxRange: number;
  // goes in hook
  minRange: number;
  order: 'ascending' | 'descending';
  sortBy: 'label' | 'value' | 'none';
  string: 'XP';
  styleConfig: BarChartStyles;
  xScale: number;
};
