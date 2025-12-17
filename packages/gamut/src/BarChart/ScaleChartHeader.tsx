import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { FlexBox } from '../Box';
import { Text } from '../Typography';
import { useBarChartContext } from './BarChartProvider';
import { formatNumberUSCompact, getLabel } from './utils';

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

export const ScaleChartHeader: React.FC<ScaleChartHeaderProps> = ({
  labelCount,
  max,
}) => {
  const { styleConfig } = useBarChartContext();

  const scaleLabels = Array.from({ length: labelCount }, (_, i) => (
    <StyledLabelText
      data-testid="chart-header-label"
      key={i}
      textAlign="center"
      textColor={styleConfig.textColor}
      variant="p-small"
    >
      {formatNumberUSCompact({
        num: getLabel({ labelCount, labelIndex: i, max }),
      })}
    </StyledLabelText>
  ));

  return (
    <FlexBox
      aria-hidden="true"
      display={{ _: 'none', sm: 'flex' }}
      justifyContent="space-between"
      mb={8}
      pl={{ _: 64, sm: 96 }}
      pr={{ _: 40, sm: 64 }}
      width="100%"
    >
      {scaleLabels}
    </FlexBox>
  );
};
