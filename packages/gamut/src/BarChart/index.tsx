import { useId, useMemo } from 'react';

import { Box } from '../Box';
import { Text } from '../Typography/Text';
import { Bar } from './Bar';
import { BarChartProvider } from './BarChartProvider';
import { GridLines } from './layout/GridLines';
import { ScaleChartHeader } from './layout/ScaleChartHeader';
import { BarsList } from './shared/elements';
import { BarChartProps } from './shared/types';
import { sortBars } from './utils';
import { useBarChart } from './utils/hooks';

export const BarChart: React.FC<BarChartProps> = ({
  'aria-labelledby': ariaLabelledBy,
  animate = false,
  barValues,
  description,
  hideDescription = false,
  hideTitle = false,
  maxRange,
  minRange,
  order = 'ascending',
  sortBy = 'none',
  styleConfig,
  title,
  unit = '',
  xScale,
}) => {
  const sortedBars = useMemo(
    () => sortBars({ bars: barValues, sortBy, order }),
    [barValues, sortBy, order]
  );

  const contextValue = useBarChart({
    minRange,
    maxRange,
    xScale,
    unit,
    styleConfig,
    animate,
    barCount: sortedBars?.length,
  });

  // Calculate number of ticks for the scale header
  const tickCount = Math.ceil((maxRange - minRange) / contextValue.xScale) + 1;

  const titleId = useId();

  const titleProps =
    typeof title === 'string'
      ? {
          as: 'h2' as const,
          children: title,
          hidden: hideTitle,
          id: titleId,
          variant: 'title-xs' as const,
        }
      : title
      ? { ...title, children: title.title, hidden: hideTitle, id: titleId }
      : null;

  return (
    <BarChartProvider value={contextValue}>
      {title && <Text mb={4} {...titleProps} />}
      <Box as="figure" position="relative" width="100%">
        {/* Scale header with x-axis labels */}
        <ScaleChartHeader
          labelCount={tickCount}
          max={maxRange}
          min={minRange}
        />

        <Box position="relative" width="100%">
          <GridLines max={maxRange} min={minRange} tickCount={tickCount} />
          <BarsList aria-labelledby={ariaLabelledBy ?? titleId}>
            {sortedBars.map((bar, index) => {
              const uniqueKey = `${bar.yLabel}-${bar.seriesOneValue}-${
                bar.seriesTwoValue ?? ''
              }`;
              return <Bar index={index} key={uniqueKey} {...bar} />;
            })}
          </BarsList>
        </Box>
        <Text
          as="figcaption"
          color="text-disabled"
          hidden={hideDescription}
          mt={8}
          variant="p-small"
        >
          {description}
        </Text>
      </Box>
    </BarChartProvider>
  );
};
