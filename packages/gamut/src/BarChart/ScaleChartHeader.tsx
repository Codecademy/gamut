import { ReactElement } from 'react';

import { GridBox } from '../Box';
import { GridBoxProps } from '../Box/props';
import { Column } from '../Layout';
import { Text } from '../Typography';
import { formatNumberUSCompact } from './utils';

export const getLabel = (
  labelCount: number,
  labelIndex: number,
  max: number
) => {
  const incrementalDecimal = 100 / (labelCount - 1) / 100;
  return Math.floor(incrementalDecimal * labelIndex * max);
};

export const ScaleChartHeader: React.FC<{
  min: number;
  max: number;
  labelCount: number;
}> = ({ labelCount, min, max }) => {
  const gridColumns = labelCount;
  const scaleLabels: ReactElement[] = [];
  console.log(labelCount, min, max);
  for (let i = min; i < labelCount; i++) {
    scaleLabels.push(
      <Column size={1} justifyItems="center" key={i}>
        <Text data-testid="chart-header-label">
          {formatNumberUSCompact(getLabel(labelCount, i, max))}
        </Text>
      </Column>
    );
  }
  return (
    <GridBox
      gridTemplateColumns={{ _: `repeat(${gridColumns - 1}, 1fr)` }}
      height="100%"
    >
      {scaleLabels}
    </GridBox>
  );
};
