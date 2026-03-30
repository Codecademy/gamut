/** Shared context fields for accessibility summary functions. */
type BarChartSummaryContextBase = {
  unit: string;
  locale: string;
};

/**
 * Context passed to the stacked-bar summary function (stackedBarSummary).
 * Used for rows that have seriesTwoValue (two values per row).
 */
export type BarChartStackedSummaryContext = BarChartSummaryContextBase & {
  categoryLabel: string;
  seriesOneValue: number;
  seriesTwoValue: number;
  /** Precomputed: seriesTwoValue - seriesOneValue. Use in the summary string (e.g. "50 XP gained - now at 150 XP"). */
  gained: number;
};

/**
 * Context passed to the single-value bar summary function (singleValueBarSummary).
 * Used for all single-bar rows (no seriesTwoValue). The component uses the returned string as aria-label (when row is link/button) or screenreader-only text (when row is a div).
 */
export type BarChartSingleValueBarSummaryContext =
  BarChartSummaryContextBase & {
    categoryLabel: string;
    value: number;
  };

/**
 * BarChart translation configuration for internationalization.
 *
 * **accessibility** is function-only. Two optional summary functions; when omitted, default English summaries are used.
 * - **stackedBarSummary**: Used for stacked (two-value) rows. Context includes `gained` (seriesTwoValue - seriesOneValue).
 * - **singleValueBarSummary**: Used for all single-value rows. Return value is placed as aria-label (when row is link/button) or screenreader-only text (when not).
 *
 * **sortLabel**, **sortOptions**, and **locale** are always strings.
 */
export type BarChartTranslations = {
  sortLabel: string;
  sortOptions: {
    none: string;
    labelAsc: string;
    labelDesc: string;
    valueAsc: string;
    valueDesc: string;
  };
  accessibility: {
    /** Used for stacked (two-value) rows. Context includes `gained` for the numeric difference. */
    stackedBarSummary?: (ctx: BarChartStackedSummaryContext) => string;
    /** Used for all single-value rows. Same return value is placed as aria-label (when row is link/button) or screenreader-only text (when not). */
    singleValueBarSummary?: (
      ctx: BarChartSingleValueBarSummaryContext
    ) => string;
  };
  /** For Intl.NumberFormat (e.g. 'en', 'es', 'fr'). */
  locale: string;
};

/**
 * Partial translations for BarChart. Nested `accessibility` and `sortOptions` may
 * override individual keys; they are merged with defaults at runtime.
 */
export type PartialBarChartTranslations = Partial<
  Omit<BarChartTranslations, 'accessibility' | 'sortOptions'>
> & {
  sortOptions?: Partial<BarChartTranslations['sortOptions']>;
  accessibility?: Partial<BarChartTranslations['accessibility']>;
};

/**
 * Default stacked-bar summary (English).
 */
export const getDefaultStackedBarSummary = (
  ctx: BarChartStackedSummaryContext
): string => {
  const unitText = ctx.unit ? ` ${ctx.unit}` : '';
  return `Starting value - ${ctx.seriesOneValue}${unitText}. ${ctx.gained}${unitText} gained - now at ${ctx.seriesTwoValue}${unitText} in ${ctx.categoryLabel}`;
};

/**
 * Default single-value bar summary (English).
 */
export const getDefaultSingleValueBarSummary = (
  ctx: BarChartSingleValueBarSummaryContext
): string => {
  const unitText = ctx.unit ? ` ${ctx.unit}` : '';
  return `${ctx.value}${unitText} in ${ctx.categoryLabel}`;
};

export const defaultBarChartTranslations: BarChartTranslations = {
  sortLabel: 'Order by:',
  sortOptions: {
    none: 'None',
    labelAsc: 'Label (A-Z)',
    labelDesc: 'Label (Z-A)',
    valueAsc: 'Value (Low-High)',
    valueDesc: 'Value (High-Low)',
  },
  accessibility: {
    stackedBarSummary: getDefaultStackedBarSummary,
    singleValueBarSummary: getDefaultSingleValueBarSummary,
  },
  locale: 'en',
};
