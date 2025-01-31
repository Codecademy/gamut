import { GamutIconProps } from '@codecademy/gamut-icons';

import { AnchorProps } from '../Anchor';
import { BoxProps } from '../Box';
import { ButtonProps } from '../Button';
import { ButtonBase } from '../ButtonBase';

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

type BarProps = ButtonProps['onClick'] &
  Pick<AnchorProps, 'href'> & {
    yLabel: string;
    // The foreground stacked bar
    startingValue: number;
    // The background bar
    endingValue?: number;
    // The actual type is in Gamut
    icon?: React.ComponentType<GamutIconProps>;
  };
export type BarChartProps = BarChartLabel & {
  barValues: BarProps[];
  maxRange: number;
  minRange: number;
  order: 'ascending' | 'descending';
  sortBy: 'label' | 'value' | 'none';
  string: 'XP';
  styleConfig: BarChartStyles;
  xScale: number;
};
