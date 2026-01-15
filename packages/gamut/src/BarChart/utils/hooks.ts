import {
  ColorModeShape,
  Colors,
  useColorModes,
} from '@codecademy/gamut-styles';
import { getContrast } from 'polished';
import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { SelectOptions } from '../../Form/inputs/Select';
import { BarChartContext, BarChartContextProps } from '../BarChartProvider';
import { BarChartTranslations } from '../shared/translations';
import { BarChartStyles, BarProps, InferBarType } from '../shared/types';
import { calculatePositionPercent, getLabel, sortBars } from './index';

export interface LabelPosition {
  value: number;
  positionPercent: number;
}

const defaultStyleConfig: Required<BarChartStyles> = {
  textColor: 'text',
  foregroundBarColor: 'feedback-warning',
  backgroundBarColor: 'background-primary',
  seriesOneLabel: 'text-secondary',
  seriesTwoLabel: 'primary',
};

/**
 * Hook that calculates label positions for a given range and count
 * Returns an array of { value, positionPercent } objects
 */
export const useLabelPositions = ({
  min,
  max,
  count,
}: {
  min: number;
  max: number;
  count: number;
}): LabelPosition[] => {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const value = getLabel({ labelCount: count, labelIndex: i, min, max });
        const positionPercent = calculatePositionPercent({ value, min, max });
        return { value, positionPercent };
      }),
    [min, max, count]
  );
};

export const useBarChartContext = (): BarChartContextProps => {
  return useContext(BarChartContext);
};

export interface UseBarChartOptions {
  minRange: number;
  maxRange: number;
  xScale?: number;
  unit?: string;
  styleConfig?: BarChartStyles;
  animate?: boolean;
  barCount?: number;
  translations: BarChartTranslations;
}

export const useBarChart = ({
  minRange,
  maxRange,
  xScale,
  unit = '',
  styleConfig,
  animate = false,
  barCount = 0,
  translations,
}: UseBarChartOptions) => {
  const [widestLeftLabelWidth, setWidestLeftLabelWidthState] = useState<
    number | null
  >(null);
  const [widestRightLabelWidth, setWidestRightLabelWidthState] = useState<
    number | null
  >(null);
  const [isMeasuring, setIsMeasuring] = useState(true);
  const measuredCountRef = useRef(0);
  const maxLeftWidthRef = useRef(0);
  const maxRightWidthRef = useRef(0);

  const setWidestLeftLabelWidth = useCallback(
    (width: number) => {
      if (width > maxLeftWidthRef.current) {
        maxLeftWidthRef.current = width;
        setWidestLeftLabelWidthState(width);
      }

      measuredCountRef.current += 1;
      // Only stop measuring when we've received measurements from all bars
      if (measuredCountRef.current >= barCount * 2 && barCount > 0) {
        setIsMeasuring(false);
      }
    },
    [barCount]
  );

  const setWidestRightLabelWidth = useCallback(
    (width: number) => {
      if (width > maxRightWidthRef.current) {
        maxRightWidthRef.current = width;
        setWidestRightLabelWidthState(width);
      }

      measuredCountRef.current += 1;
      // Only stop measuring when we've received measurements from all bars (left + right)
      if (measuredCountRef.current >= barCount * 2 && barCount > 0) {
        setIsMeasuring(false);
      }
    },
    [barCount]
  );

  useEffect(() => {
    if (barCount > 0) {
      measuredCountRef.current = 0;
      maxLeftWidthRef.current = 0;
      maxRightWidthRef.current = 0;
      setIsMeasuring(true);
    }
  }, [barCount]);

  return useMemo(
    () => ({
      minRange,
      maxRange,
      xScale: xScale ?? Math.ceil((maxRange - minRange) / 5),
      unit,
      styleConfig: {
        ...defaultStyleConfig,
        ...styleConfig,
      },
      animate,
      widestLeftLabelWidth,
      setWidestLeftLabelWidth,
      widestRightLabelWidth,
      setWidestRightLabelWidth,
      isMeasuring,
      translations,
    }),
    [
      minRange,
      maxRange,
      xScale,
      unit,
      styleConfig,
      animate,
      widestLeftLabelWidth,
      setWidestLeftLabelWidth,
      widestRightLabelWidth,
      setWidestRightLabelWidth,
      isMeasuring,
      translations,
    ]
  );
};

/**
 * Checks if a color is a color alias (exists in the color mode shape)
 */
const isColorAlias = (
  mode: ColorModeShape,
  color: Colors
): color is keyof ColorModeShape => Object.keys(mode).includes(color);

/**
 * Hook that returns a function to get the highest contrast border color
 * (white or navy-900) for a given background color.
 *
 * Similar to the Background component, this resolves color aliases and
 * compares contrast ratios to determine the best border color.
 *
 * @returns A function that takes a background color and returns either 'white' or 'navy-900'
 */
export const useBarBorderColor = () => {
  const [, activeColors, , getColorValue] = useColorModes();

  const getBorderColor = useCallback(
    (bg: Colors): 'white' | 'navy-900' => {
      /** If a color alias was used then look up the true color key from the active mode */
      const trueColor = isColorAlias(activeColors, bg) ? activeColors[bg] : bg;

      const backgroundColor = getColorValue(trueColor);
      const whiteContrast = getContrast(
        getColorValue('white'),
        backgroundColor
      );
      const navyContrast = getContrast(
        getColorValue('navy-900'),
        backgroundColor
      );

      return whiteContrast > navyContrast ? 'white' : 'navy-900';
    },
    [activeColors, getColorValue]
  );

  return getBorderColor;
};

/**
 * Generic hook for measuring element width and reporting to a callback.
 * Used internally by useMeasureLeftLabelWidth and useMeasureRightLabelWidth.
 */
const useMeasureWidth = ({
  ref,
  onMeasure,
  isMeasuring,
}: {
  ref: React.RefObject<HTMLElement>;
  onMeasure: (width: number) => void;
  isMeasuring: boolean;
}): void => {
  const hasMeasuredRef = useRef(false);

  // Reset measurement flag when a new measurement cycle starts
  const prevIsMeasuringRef = useRef(isMeasuring);
  useEffect(() => {
    if (isMeasuring && !prevIsMeasuringRef.current) {
      // New measurement cycle started
      hasMeasuredRef.current = false;
    }
    prevIsMeasuringRef.current = isMeasuring;
  }, [isMeasuring]);

  useLayoutEffect(() => {
    if (!ref.current || hasMeasuredRef.current || !isMeasuring) {
      return;
    }

    const element = ref.current;
    const width = element?.getBoundingClientRect()?.width;

    if (width > 0) {
      onMeasure(width);
      hasMeasuredRef.current = true;
    }
  }, [ref, onMeasure, isMeasuring]);
};

export const useMeasureLeftLabelWidth = ({
  ref,
}: {
  ref: React.RefObject<HTMLElement>;
}): void => {
  const { setWidestLeftLabelWidth, isMeasuring } = useBarChartContext();
  useMeasureWidth({
    ref,
    onMeasure: setWidestLeftLabelWidth,
    isMeasuring,
  });
};

export const useMeasureRightLabelWidth = ({
  ref,
}: {
  ref: React.RefObject<HTMLElement>;
}): void => {
  const { setWidestRightLabelWidth, isMeasuring } = useBarChartContext();
  useMeasureWidth({
    ref,
    onMeasure: setWidestRightLabelWidth,
    isMeasuring,
  });
};

export interface CustomSortOption<TBar extends BarProps = BarProps> {
  label: string;
  value: string;
  sortFn: (bars: TBar[]) => TBar[];
}

export interface UseBarChartSortOptions<
  TBarValues extends BarProps[] | readonly BarProps[] = BarProps[]
> {
  bars: TBarValues;
  sortFns?: (
    | 'alphabetically'
    | 'numerically'
    | 'none'
    | CustomSortOption<InferBarType<TBarValues>>
  )[];
  translations: BarChartTranslations;
}

export interface UseBarChartSortReturn<
  TBarValues extends BarProps[] | readonly BarProps[] = BarProps[]
> {
  sortedBars: TBarValues;
  sortValue: string;
  onSortChange: (value: string) => void;
  selectProps: {
    options: SelectOptions;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    id: string;
  } | null;
}

/**
 * Hook that manages bar sorting state and provides memoized sorted bars.
 * Supports predefined sort options (via string literals) and custom sort functions.
 * Only returns selectProps if sortFns is provided.
 */
export const useBarChartSort = <
  TBarValues extends BarProps[] | readonly BarProps[] = BarProps[]
>({
  bars,
  sortFns,
  translations,
}: UseBarChartSortOptions<TBarValues>): UseBarChartSortReturn<TBarValues> => {
  type TBar = InferBarType<TBarValues>;
  // Build options map and custom sort map from sortFns array
  const { allSortOptions, customSortMap, defaultSortValue } = useMemo(() => {
    if (!sortFns || sortFns.length === 0) {
      return {
        allSortOptions: null,
        customSortMap: new Map<string, (bars: TBar[]) => TBar[]>(),
        defaultSortValue: 'none',
      };
    }

    const options: Record<string, string> = {};
    const customMap = new Map<string, (bars: TBar[]) => TBar[]>();
    const availableValues: string[] = [];

    sortFns.forEach((item) => {
      if (typeof item === 'string') {
        if (item === 'alphabetically') {
          options['label-asc'] = translations.sortOptions.labelAsc;
          options['label-desc'] = translations.sortOptions.labelDesc;
          availableValues.push('label-asc', 'label-desc');
        } else if (item === 'numerically') {
          options['value-asc'] = translations.sortOptions.valueAsc;
          options['value-desc'] = translations.sortOptions.valueDesc;
          availableValues.push('value-asc', 'value-desc');
        } else if (item === 'none') {
          options.none = translations.sortOptions.none;
          availableValues.push('none');
        }
      } else {
        // CustomSortOption
        options[item.value] = item.label;
        customMap.set(item.value, item.sortFn);
        availableValues.push(item.value);
      }
    });

    // Default to "none" if available, otherwise first option
    const defaultVal = availableValues.includes('none')
      ? 'none'
      : availableValues[0] || 'none';

    return {
      allSortOptions: options,
      customSortMap: customMap,
      defaultSortValue: defaultVal,
    };
  }, [sortFns, translations]);

  const [sortValue, setSortValue] = useState<string>(defaultSortValue);

  // Update sortValue when defaultSortValue changes (e.g., when sortFns changes)
  useEffect(() => {
    setSortValue(defaultSortValue);
  }, [defaultSortValue]);

  const sortedBars = useMemo(() => {
    // Check if current selection is a custom sort function
    const customSortFn = customSortMap.get(sortValue);
    if (customSortFn) {
      return customSortFn([...bars] as TBar[]) as unknown as TBarValues;
    }

    // Otherwise use predefined sort options
    if (sortValue === 'none') {
      return bars;
    }

    const [sortBy, order] = sortValue.split('-');
    const sortByValue = sortBy as 'label' | 'value';
    const orderValue = order === 'desc' ? 'descending' : 'ascending';

    return sortBars({
      bars: bars as TBar[],
      sortBy: sortByValue,
      order: orderValue,
    }) as unknown as TBarValues;
  }, [bars, sortValue, customSortMap]);

  const onSortChange = useCallback((value: string) => {
    setSortValue(value);
  }, []);

  const selectId = useRef(
    `bar-chart-sort-${Math.random().toString(36).slice(2, 11)}`
  );

  const selectProps = useMemo(() => {
    if (!allSortOptions) {
      return null;
    }

    return {
      options: allSortOptions,
      value: sortValue,
      onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSortChange(e.target.value);
      },
      id: selectId.current,
    };
  }, [sortValue, onSortChange, allSortOptions]);

  return {
    sortedBars,
    sortValue,
    onSortChange,
    selectProps,
  };
};
