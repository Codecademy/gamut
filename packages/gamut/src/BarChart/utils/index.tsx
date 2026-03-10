import { BarChartTranslations } from '../shared/translations';
import { BarChartUnit, BarProps } from '../shared/types';

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
  maxScaleValue,
}: {
  value: number;
  maxScaleValue: number;
}) => {
  const adjustedValue = Math.max(0, Math.min(maxScaleValue, value));
  return Math.floor(
    calculatePercent({ value: adjustedValue, total: maxScaleValue })
  );
};

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

export const formatNumberUnitCompact = ({
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
      return a.categoryLabel.localeCompare(b.categoryLabel);
    }
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
  categoryLabel,
  translations,
}: Pick<BarProps, 'seriesOneValue' | 'seriesTwoValue' | 'categoryLabel'> &
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
        categoryLabel,
        seriesOneValue,
        seriesTwoValue,
        unit,
        locale,
      });
    }
    const gained = seriesOneValue;
    return `${gained}${unitText} ${gainedNowAt} ${seriesTwoValue}${unitText} ${inLabel} ${categoryLabel}`;
  }

  if (isInteractive) {
    const { inLabel } = translations.accessibility;
    if (typeof inLabel === 'function') {
      return inLabel({
        categoryLabel,
        value: seriesOneValue,
        unit,
        locale,
      });
    }
    return `${seriesOneValue}${unitText} ${inLabel} ${categoryLabel}`;
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
 * Calculates the value for a given label position (scale min is always 0).
 */
export const getLabel = ({
  labelCount,
  labelIndex,
  max,
}: {
  labelCount: number;
  labelIndex: number;
  max: number;
}): number => {
  if (labelCount <= 1) return max;
  const incrementalDecimal = labelIndex / (labelCount - 1);
  return Math.floor(incrementalDecimal * max);
};

/**
 * Calculates the percentage position for a given value within 0–max range.
 * Returns a value between 0 and 100 representing the position percentage.
 */
export const calculatePositionPercent = ({
  value,
  max,
}: {
  value: number;
  max: number;
}): number => {
  if (max === 0) return 0;
  return (value / max) * 100;
};

/**
 * Generates a stable key for a bar row (for React list keys).
 */
export const getBarRowKey = (
  bar: Pick<BarProps, 'categoryLabel' | 'seriesOneValue' | 'seriesTwoValue'>,
  index: number
): string =>
  bar.categoryLabel && bar.seriesOneValue
    ? `${bar.categoryLabel}-${bar.seriesOneValue}-${
        bar.seriesTwoValue ?? ''
      }-${index}`
    : String(index);
