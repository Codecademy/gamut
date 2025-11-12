import * as React from 'react';

import { Box } from '../Box';
import { BarChartProvider } from './BarChartContext';
import { BarRow } from './BarRow';
import { GridLines } from './GridLines';
import { ScaleChartHeader } from './ScaleChartHeader';
import { BarChartProps } from './types';
import { sortAndOrderBarValues } from './utils';

export type { BarChartProps, BarProps } from './types';

export const BarChart: React.FC<BarChartProps> = ({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  animate = false,
  barValues,
  maxRange,
  minRange,
  order = 'ascending',
  sortBy = 'none',
  unit,
  styleConfig = {},
  xScale,
}) => {
  // Sort and order bar values
  const processedBarValues = React.useMemo(
    () => sortAndOrderBarValues(barValues, sortBy, order),
    [barValues, sortBy, order]
  );

  // Context value for provider
  const contextValue = React.useMemo(
    () => ({
      styleConfig,
      minRange,
      maxRange,
      xScale,
      unit,
      animate,
    }),
    [styleConfig, minRange, maxRange, xScale, unit, animate]
  );

  return (
    <BarChartProvider value={contextValue}>
      <Box width="100%" position="relative">
        <ScaleChartHeader
          minRange={minRange}
          maxRange={maxRange}
          xScale={xScale}
          unit={unit}
        />
        <Box
          as="ul"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          position="relative"
          m={0}
          p={0}
          listStyleType="none"
        >
          <GridLines />
          {processedBarValues.map((barValue) => (
            <BarRow key={barValue.yLabel} {...barValue} />
          ))}
        </Box>
      </Box>
    </BarChartProvider>
  );
};
