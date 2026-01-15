import { BarChartRange, BarChartUnit, BarProps } from '../shared/types';

export const numDigits = ({ num }: { num: number }) => {
  return Math.max(Math.floor(Math.log10(Math.abs(num))), 0) + 1;
};

export const columnBaseSize = ({ experience = 3 }: { experience?: number }) => {
  const digits = numDigits({ num: experience });
  return {
    sm: digits > 4 ? 5 : 4,
    md: digits > 4 ? 5 : 4,
    lg: digits > 4 ? 4 : 5,
    xl: digits > 4 ? 5 : 4,
  };
};

export const calculatePercent = ({
  value,
  total,
}: {
  value: number;
  total: number;
}) => {
  return (value / total) * 100;
};

export const calculateBarWidth = ({
  value,
  minRange,
  maxRange,
}: {
  value: number;
} & BarChartRange) => {
  const range = maxRange - minRange;
  const adjustedValue = value - minRange;
  return Math.floor(calculatePercent({ value: adjustedValue, total: range }));
};

/**
 * Calculate tick spacing and nice minimum and maximum data points on the axis.
 */
export const calculateTicksAndRange = ({
  maxTicks,
  min,
  max,
}: {
  maxTicks: number;
} & {
  min: BarChartRange['minRange'];
  max: BarChartRange['maxRange'];
}): [number, number, number] => {
  const range = niceNum({ range: max - min, roundDown: false });
  const tickSpacing = niceNum({
    range: range / (maxTicks - 1),
    roundDown: true,
  });
  const niceMin = Math.floor(min / tickSpacing) * tickSpacing;
  const niceMax = Math.ceil(max / tickSpacing) * tickSpacing;
  const tickCount = range / tickSpacing;
  return [tickCount, niceMin, niceMax];
};

/**
 * Returns a "nice" number approximately equal to range
 * Rounds the number if round = true
 * Takes the ceiling if round = false.
 * A nice number is a simple decimal number, for example if a number is 1234, a nice number would be 1000 or 2000.
 */
export const niceNum = ({
  range,
  roundDown,
}: {
  range: number;
  roundDown: boolean;
}): number => {
  const exponent = Math.floor(Math.log10(range));
  const fraction = range / 10 ** exponent;

  let niceFraction: number;

  if (roundDown) {
    if (fraction < 1.5) niceFraction = 1;
    else if (fraction < 3) niceFraction = 2;
    else if (fraction < 7) niceFraction = 5;
    else niceFraction = 10;
  } else if (fraction <= 1) niceFraction = 1;
  else if (fraction <= 2) niceFraction = 2;
  else if (fraction <= 5) niceFraction = 5;
  else niceFraction = 10;

  return niceFraction * 10 ** exponent;
};

export const getPercentDiff = ({ v1, v2 }: { v1: number; v2: number }) => {
  return (Math.abs(v1 - v2) / ((v1 + v2) / 2)) * 100;
};

export const formatNumberUS = ({ num }: { num: number }) =>
  Intl.NumberFormat('en').format(num);

export const formatNumberUSCompact = ({ num }: { num: number }) =>
  Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(num);

/**
 * Sort bars based on sortBy and order configuration
 */
export const sortBars = <T extends BarProps>({
  bars,
  sortBy,
  order,
}: {
  bars: T[];
  sortBy: 'label' | 'value' | 'none';
  order: 'ascending' | 'descending';
}): T[] => {
  if (sortBy === 'none' || !sortBy) {
    return bars;
  }

  const sorted = [...bars].sort((a, b) => {
    if (sortBy === 'label') {
      return a.yLabel.localeCompare(b.yLabel);
    }
    // sortBy === 'value' - use seriesTwoValue if available, otherwise seriesOneValue
    const aValue = a.seriesTwoValue ?? a.seriesOneValue;
    const bValue = b.seriesTwoValue ?? b.seriesOneValue;
    return aValue - bValue;
  });

  return order === 'descending' ? sorted.reverse() : sorted;
};

/**
 * Generates an accessible summary of the bar values
 */
export const getValuesSummary = ({
  isInteractive,
  seriesOneValue,
  seriesTwoValue,
  unit,
  yLabel,
}: Pick<BarProps, 'seriesOneValue' | 'seriesTwoValue' | 'yLabel'> &
  Required<Pick<BarChartUnit, 'unit'>> & {
    isInteractive: boolean;
  }): string => {
  const unitText = unit ? ` ${unit}` : '';

  if (seriesTwoValue !== undefined) {
    const gained = seriesOneValue;
    return `${gained}${unitText} gained - now at ${seriesTwoValue}${unitText} in ${yLabel}`;
  }

  return isInteractive
    ? `${seriesOneValue}${unitText} in ${yLabel}`
    : `${seriesOneValue}${unitText} in `;
};

/**
 * Calculates the value for a given label position
 */
export const getLabel = ({
  labelCount,
  labelIndex,
  min,
  max,
}: {
  labelCount: number;
  labelIndex: number;
} & {
  min: BarChartRange['minRange'];
  max: BarChartRange['maxRange'];
}): number => {
  if (labelCount <= 1) return max;
  const incrementalDecimal = labelIndex / (labelCount - 1);
  return Math.floor(min + incrementalDecimal * (max - min));
};

/**
 * Calculates the percentage position for a given value within a range
 * Returns a value between 0 and 100 representing the position percentage
 */
export const calculatePositionPercent = ({
  value,
  min,
  max,
}: {
  value: number;
} & {
  min: BarChartRange['minRange'];
  max: BarChartRange['maxRange'];
}): number => {
  if (max === min) return 0;
  const range = max - min;
  const adjustedValue = value - min;
  return (adjustedValue / range) * 100;
};
