import { useMemo } from 'react';

import { Box } from '../Box';
import { BarChartProvider, useBarChart } from './BarChartProvider';
import { BarRow } from './BarRow';
import { GridLines } from './GridLines';
import { ScaleChartHeader } from './ScaleChartHeader';
import { BarChartProps } from './types';
import { sortBars } from './utils';

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
    () => sortBars({ bars: barValues, sortBy, order }),
    [barValues, sortBy, order]
  );

  // Calculate number of ticks for the scale header
  const tickCount = Math.ceil((maxRange - minRange) / contextValue.xScale) + 1;

  return (
    <BarChartProvider value={contextValue}>
      <Box position="relative" width="100%">
        {/* Scale header with x-axis labels */}
        <ScaleChartHeader
          labelCount={tickCount}
          max={maxRange}
          min={minRange}
        />

        {/* Chart area with grid lines and bars */}
        <Box position="relative" width="100%">
          {/* Grid lines (hidden on small screens) */}
          <GridLines tickCount={tickCount} min={minRange} max={maxRange} />

          {/* Bar list */}
          <Box
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            as="ul"
            listStyle="none"
            m={0}
            p={0}
          >
            {sortedBars.map((bar, index) => (
              <BarRow index={index} key={`${bar.yLabel}-${index}`} {...bar} />
            ))}
          </Box>
        </Box>
      </Box>
    </BarChartProvider>
  );
};

export * from './types';
