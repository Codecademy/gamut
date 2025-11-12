import { orderBy } from 'lodash';

import { BarProps } from '../types';

export const numDigits = (num: number) => {
  return Math.max(Math.floor(Math.log10(Math.abs(num))), 0) + 1;
};

export const columnBaseSize = (experience = 3) => {
  const digits = numDigits(experience);
  return {
    sm: digits > 4 ? 5 : 4,
    md: digits > 4 ? 5 : 4,
    lg: digits > 4 ? 4 : 5,
    xl: digits > 4 ? 5 : 4,
  };
};

export const calculatePercent = (value: number, total: number) => {
  return (value / total) * 100;
};

export const calculateBarWidth = ({
  value,
  maxRange,
}: {
  value: number;
  maxRange: number;
}) => {
  return Math.floor(calculatePercent(value, maxRange));
};

// Calculate tick spacing and nice minimum and maximum data points on the axis.

export const calculateTicksAndRange = (
  maxTicks: number,
  minPoint: number,
  maxPoint: number
): [number, number, number] => {
  const range = niceNum(maxPoint - minPoint, false);
  const tickSpacing = niceNum(range / (maxTicks - 1), true);
  const niceMin = Math.floor(minPoint / tickSpacing) * tickSpacing;
  const niceMax = Math.ceil(maxPoint / tickSpacing) * tickSpacing;
  const tickCount = range / tickSpacing;
  return [tickCount, niceMin, niceMax];
};

/**
 * Returns a "nice" number approximately equal to range
 * Rounds the number if round = true
 * Takes the ceiling if round = false.
 * A nice number is a simple decimal number, for example if a number is 1234, a nice number would be 1000 or 2000.
 */
export const niceNum = (range: number, roundDown: boolean): number => {
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

export const getPercentDiff = (v1: number, v2: number) => {
  return (Math.abs(v1 - v2) / ((v1 + v2) / 2)) * 100;
};

export const formatNumberUS = (num: number) =>
  Intl.NumberFormat('en').format(num);

export const formatNumberUSCompact = (num: number) =>
  Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(num);

/**
 * Generate accessible aria-label text for a bar row
 * Ex: "10 XP gained - now at 1555 XP in Computer Science category"
 * If no starting value: "1555 XP in Computer Science category"
 */
export const getValuesSummary = ({
  yLabel,
  startingValue,
  endingValue,
  unit,
}: {
  yLabel: string;
  startingValue: number;
  endingValue?: number;
  unit: string;
}): string => {
  if (endingValue !== undefined) {
    const gained = endingValue - startingValue;
    return `${formatNumberUS(gained)} ${unit} gained - now at ${formatNumberUS(endingValue)} ${unit} in ${yLabel} category`;
  }
  return `${formatNumberUS(startingValue)} ${unit} in ${yLabel} category`;
};

/**
 * Calculate foreground and background bar percentages based on values and range
 */
export const getPercentagesFilled = ({
  startingValue,
  endingValue,
  minRange,
  maxRange,
}: {
  startingValue: number;
  endingValue?: number;
  minRange: number;
  maxRange: number;
}): {
  foregroundPercent: number;
  backgroundPercent: number;
} => {
  const range = maxRange - minRange;
  const foregroundPercent = ((startingValue - minRange) / range) * 100;
  const backgroundPercent = endingValue
    ? ((endingValue - minRange) / range) * 100
    : foregroundPercent;

  return {
    foregroundPercent: Math.max(0, Math.min(100, foregroundPercent)),
    backgroundPercent: Math.max(0, Math.min(100, backgroundPercent)),
  };
};

/**
 * Sort and order bar values array
 */
export const sortAndOrderBarValues = (
  barValues: BarProps[],
  sortBy: 'label' | 'value' | 'none' = 'none',
  order: 'ascending' | 'descending' = 'ascending'
): BarProps[] => {
  if (sortBy === 'none') {
    return barValues;
  }

  const direction = order === 'ascending' ? 'asc' : 'desc';

  if (sortBy === 'label') {
    return orderBy(
      barValues,
      [(bar) => bar.yLabel.toLowerCase()],
      [direction]
    );
  }

  // Sort by value - use endingValue if available, otherwise startingValue
  return orderBy(
    barValues,
    [(bar) => bar.endingValue ?? bar.startingValue],
    [direction]
  );
};
