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

import { BarChartContext, BarChartContextProps } from '../BarChartProvider';
import { BarChartStyles } from '../shared/types';
import { calculatePositionPercent, getLabel } from './index';

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
}

export const useBarChart = ({
  minRange,
  maxRange,
  xScale,
  unit = '',
  styleConfig,
  animate = false,
  barCount = 0,
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

/**
 * Hook that measures a left label FlexBox width and reports it to the BarChartProvider.
 * Uses useLayoutEffect for synchronous measurement to prevent layout shift.
 */
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

/**
 * Hook that measures a right label FlexBox width and reports it to the BarChartProvider.
 * Uses useLayoutEffect for synchronous measurement to prevent layout shift.
 */
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
