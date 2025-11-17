import { ReactElement } from 'react';

import { Box, GridBox } from '../Box';
import { Column } from '../Layout';
import { Text } from '../Typography';
import { formatNumberUSCompact } from './shared';

export interface ScaleChartHeaderProps {
  minRange: number;
  maxRange: number;
  xScale: number;
  unit?: string;
}

export const ScaleChartHeader: React.FC<ScaleChartHeaderProps> = ({
  minRange,
  maxRange,
  xScale,
  unit = '',
}) => {
  const range = maxRange - minRange;
  const numberOfTicks = Math.floor(range / xScale) + 1;
  const scaleLabels: ReactElement[] = [];

  // Generate labels based on xScale intervals
  for (let i = 0; i < numberOfTicks; i++) {
    const value = minRange + i * xScale;
    const label = unit
      ? `${formatNumberUSCompact(value)} ${unit}`
      : formatNumberUSCompact(value);

    scaleLabels.push(
      <Column justifyItems="flex-start" key={i} size={1}>
        <Text
          color="navy-600"
          data-testid="chart-header-label"
          fontSize={{ _: 10, sm: 12 }}
        >
          {label}
        </Text>
      </Column>
    );
  }

  return (
    <Box display={{ _: 'none', sm: 'flex' }} mb={8} px={16}>
      {/* Spacer for icon and label area - matches BarRow layout */}
      <Box flexShrink={0} width={{ _: '140px', sm: '180px' }} />
      <Box flexShrink={0} width={16} />
      <GridBox
        flexGrow={1}
        gridTemplateColumns={`repeat(${numberOfTicks}, 1fr)`}
        minWidth={0}
      >
        {scaleLabels}
      </GridBox>
    </Box>
  );
};
