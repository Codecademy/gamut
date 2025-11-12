import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';

import { Box } from '../Box';
import { useBarChartContext } from './BarChartContext';

const GridContainer = styled(Box)(
  css({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: { _: 'none', sm: 'flex' },
    pointerEvents: 'none',
    zIndex: 1,
  })
);

const GridLine = styled(Box)(
  css({
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '1px',
    bg: 'border-tertiary',
    opacity: 0.3,
  })
);

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

  return <GridContainer>{lines}</GridContainer>;
};

