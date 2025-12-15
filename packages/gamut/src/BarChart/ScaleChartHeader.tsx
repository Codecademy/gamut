import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { FlexBox } from '../Box';
import { Text } from '../Typography';
import { formatNumberUSCompact } from './utils';

export interface ScaleChartHeaderProps {
  /** Minimum value on the scale */
  min: number;
  /** Maximum value on the scale */
  max: number;
  /** Number of labels to display */
  labelCount: number;
}

const StyledLabelText = styled(Text)(
  css({
    flex: 1,
  })
);

/**
 * Calculates the value for a given label position
 */
export const getLabel = (
  labelCount: number,
  labelIndex: number,
  max: number
): number => {
  if (labelCount <= 1) return max;
  const incrementalDecimal = labelIndex / (labelCount - 1);
  return Math.floor(incrementalDecimal * max);
};

/**
 * Header component showing the x-axis scale labels
 */
export const ScaleChartHeader: React.FC<ScaleChartHeaderProps> = ({
  labelCount,
  max,
}) => {
  const scaleLabels = Array.from({ length: labelCount }, (_, i) => (
    <StyledLabelText
      key={i}
      variant="p-small"
      textColor="text-secondary"
      data-testid="chart-header-label"
      textAlign={i === 0 ? 'left' : i === labelCount - 1 ? 'right' : 'center'}
    >
      {formatNumberUSCompact(getLabel(labelCount, i, max))}
    </StyledLabelText>
  ));

  return (
    <FlexBox
      width="100%"
      justifyContent="space-between"
      mb={8}
      pl={{ _: 64, sm: 96 }}
      pr={{ _: 40, sm: 64 }}
      display={{ _: 'none', sm: 'flex' }}
      aria-hidden="true"
    >
      {scaleLabels}
    </FlexBox>
  );
};
