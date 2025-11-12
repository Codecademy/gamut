import * as React from 'react';

import { Box } from '../Box';
import { useBarChartContext } from './BarChartContext';
import { GridContainer, GridLine } from './elements';

export const GridLines: React.FC = () => {
  const { xScale, minRange, maxRange } = useBarChartContext();

  const range = maxRange - minRange;
  const numberOfLines = Math.floor(range / xScale);

  const lines: React.ReactElement[] = [];

  for (let i = 1; i <= numberOfLines; i++) {
    const position = (i * xScale) / range;
    const leftPercent = `${position * 100}%`;

    lines.push(
      <GridLine
        key={`grid-line-${i}`}
        style={{ left: leftPercent }}
        data-testid={`grid-line-${i}`}
      />
    );
  }

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      display={{ _: 'none', sm: 'flex' }}
      pointerEvents="none"
      zIndex={1}
    >
      {lines}
    </Box>
  );
};
