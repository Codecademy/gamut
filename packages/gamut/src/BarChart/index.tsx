import { useMemo } from 'react';

import { Box } from '../Box';
import { BarChartProvider, useBarChart } from './BarChartProvider';
import { BarRow } from './BarRow';
import { GridLines } from './GridLines';
import { ScaleChartHeader } from './ScaleChartHeader';
import { BarChartProps, BarProps } from './types';

/**
 * Sort bars based on sortBy and order configuration
 */
function sortBars(
  bars: BarProps[],
  sortBy: BarChartProps['sortBy'],
  order: BarChartProps['order']
): BarProps[] {
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
}

export const BarChart: React.FC<BarChartProps> = ({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  animate = false,
  barValues,
  maxRange,
  minRange,
  order = 'ascending',
  sortBy = 'none',
  unit = '',
  styleConfig,
  xScale,
}) => {
  const contextValue = useBarChart({
    minRange,
    maxRange,
    xScale,
    unit,
    styleConfig,
    animate,
  });

  const sortedBars = useMemo(
    () => sortBars(barValues, sortBy, order),
    [barValues, sortBy, order]
  );

  // Calculate number of ticks for the scale header
  const tickCount = Math.ceil((maxRange - minRange) / contextValue.xScale) + 1;

  return (
    <BarChartProvider value={contextValue}>
      <Box width="100%" position="relative">
        {/* Scale header with x-axis labels */}
        <ScaleChartHeader
          min={minRange}
          max={maxRange}
          labelCount={tickCount}
        />

        {/* Chart area with grid lines and bars */}
        <Box position="relative" width="100%">
          {/* Grid lines (hidden on small screens) */}
          <GridLines tickCount={tickCount} />

          {/* Bar list */}
          <Box
            as="ul"
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            p={0}
            m={0}
            listStyle="none"
          >
            {sortedBars.map((bar, index) => (
              <BarRow key={`${bar.yLabel}-${index}`} index={index} {...bar} />
            ))}
          </Box>
        </Box>
      </Box>
    </BarChartProvider>
  );
};

export * from './types';
