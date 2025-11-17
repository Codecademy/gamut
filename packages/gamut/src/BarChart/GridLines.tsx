import * as React from 'react';

import { Box } from '../Box';
import { useBarChartContext } from './BarChartContext';
import { GridLine } from './elements';

export const GridLines: React.FC = () => {
  const { xScale, minRange, maxRange } = useBarChartContext();

  const range = maxRange - minRange;
  const numberOfLines = Math.floor(range / xScale) + 1;

  const lines: React.ReactElement[] = [];

  // Create grid lines for each scale marker
  for (let i = 0; i < numberOfLines; i++) {
    const position = (i * xScale) / range;
    const leftPercent = `${position * 100}%`;

    lines.push(
      <GridLine
        data-testid={`grid-line-${i}`}
        key={`grid-line-${i}`}
        style={{ left: leftPercent }}
      />
    );
  }

  return (
    <Box
      bottom={0}
      display={{ _: 'none', sm: 'flex' }}
      left={0}
      pointerEvents="none"
      position="absolute"
      right={0}
      top={0}
      zIndex={0}
    >
      {lines}
    </Box>
  );
};
