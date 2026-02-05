import { BarChartTranslations } from '../shared/translations';
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
  const adjustedValue = Math.max(0, Math.min(range, value - minRange));
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
    if (fraction >= 10) niceFraction = 10;
    else if (fraction >= 5) niceFraction = 5;
    else if (fraction >= 2) niceFraction = 2;
    else if (fraction >= 1) niceFraction = 1;
    else niceFraction = 1;
  } else if (fraction <= 1) niceFraction = 1;
  else if (fraction <= 2) niceFraction = 2;
  else if (fraction <= 5) niceFraction = 5;
  else niceFraction = 10;

  return niceFraction * 10 ** exponent;
};

export const getPercentDiff = ({ v1, v2 }: { v1: number; v2: number }) => {
  return (Math.abs(v1 - v2) / ((v1 + v2) / 2)) * 100;
};

export const formatNumberUS = ({
  num,
  locale = 'en',
}: {
  num: number;
  locale?: string;
}) => Intl.NumberFormat(locale).format(num);

/**
 * Formats a numeric value with optional unit for bar chart labels.
 */
export const formatValueWithUnit = ({
  value,
  unit,
  locale = 'en',
}: {
  value: number;
  unit: string;
  locale?: string;
}): string => {
  const formatted = Intl.NumberFormat(locale).format(value);
  return unit ? `${formatted} ${unit}` : formatted;
};

export const formatNumberUSCompact = ({
  num,
  locale = 'en',
}: {
  num: number;
  locale?: string;
}) =>
  Intl.NumberFormat(locale, {
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
 * Generates an accessible summary of the bar values for aria-label / screen reader.
 * When translations.accessibility keys are functions, they are called with scoped
 * context (values, label, unit, locale) and their return value is used as the full summary.
 */
export const getValuesSummary = ({
  isInteractive,
  seriesOneValue,
  seriesTwoValue,
  unit,
  yLabel,
  translations,
}: Pick<BarProps, 'seriesOneValue' | 'seriesTwoValue' | 'yLabel'> &
  Required<Pick<BarChartUnit, 'unit'>> & {
    isInteractive: boolean;
    translations: BarChartTranslations;
  }): string => {
  const unitText = unit ? ` ${unit}` : '';
  const { locale } = translations;

  if (seriesTwoValue !== undefined) {
    const { gainedNowAt, inLabel } = translations.accessibility;
    if (typeof gainedNowAt === 'function') {
      return gainedNowAt({
        yLabel,
        seriesOneValue,
        seriesTwoValue,
        unit,
        locale,
      });
    }
    const gained = seriesOneValue;
    return `${gained}${unitText} ${gainedNowAt} ${seriesTwoValue}${unitText} ${inLabel} ${yLabel}`;
  }

  if (isInteractive) {
    const { inLabel } = translations.accessibility;
    if (typeof inLabel === 'function') {
      return inLabel({
        yLabel,
        value: seriesOneValue,
        unit,
        locale,
      });
    }
    return `${seriesOneValue}${unitText} ${inLabel} ${yLabel}`;
  }

  const { inOnly } = translations.accessibility;
  if (typeof inOnly === 'function') {
    return inOnly({
      value: seriesOneValue,
      unit,
      locale,
    });
  }
  return `${seriesOneValue}${unitText} ${inOnly}`;
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

export const getBarRowKey = (
  bar: Pick<BarProps, 'yLabel' | 'seriesOneValue' | 'seriesTwoValue'>,
  index: number
): string =>
  bar.yLabel && bar.seriesOneValue
    ? `${bar.yLabel}-${bar.seriesOneValue}-${bar.seriesTwoValue ?? ''}-${index}`
    : String(index);
