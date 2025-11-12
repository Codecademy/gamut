import { ReactElement } from 'react';

import { GridBox } from '../Box';
import { Column } from '../Layout';
import { Text } from '../Typography';
import { formatNumberUSCompact } from './utils';

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
      <Column size={1} justifyItems="flex-start" key={i}>
        <Text
          data-testid="chart-header-label"
          fontSize={{ _: 10, sm: 12 }}
          color="text-secondary"
        >
          {label}
        </Text>
      </Column>
    );
  }

  return (
    <GridBox
      gridTemplateColumns={`repeat(${numberOfTicks}, 1fr)`}
      height="100%"
      mb={8}
      display={{ _: 'none', sm: 'grid' }}
    >
      {scaleLabels}
    </GridBox>
  );
};
