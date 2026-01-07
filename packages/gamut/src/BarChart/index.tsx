import { useMemo } from 'react';

import { Box } from '../Box';
import { Bar } from './Bar';
import { BarChartProvider } from './BarChartProvider';
import { GridLines } from './layout/GridLines';
import { ScaleChartHeader } from './layout/ScaleChartHeader';
import { BarsList } from './shared/elements';
import { BarChartProps } from './shared/types';
import { sortBars, useBarChart } from './utils';

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
          <GridLines max={maxRange} min={minRange} tickCount={tickCount} />

          {/* Bar list */}
          <BarsList aria-label={ariaLabel} aria-labelledby={ariaLabelledBy}>
            {sortedBars.map((bar, index) => {
              const uniqueKey = `${bar.yLabel}-${bar.seriesOneValue}-${
                bar.seriesTwoValue ?? ''
              }`;
              return <Bar index={index} key={uniqueKey} {...bar} />;
            })}
          </BarsList>
        </Box>
      </Box>
    </BarChartProvider>
  );
};
