import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { Box } from '../Box';
import { Text } from '../Typography';
import { useBarChartContext } from './BarChartProvider';
import {
  calculatePositionPercent,
  formatNumberUSCompact,
  getLabel,
} from './utils';

export interface ScaleChartHeaderProps {
  /** Minimum value on the scale */
  min: number;
  /** Maximum value on the scale */
  max: number;
  /** Number of labels to display */
  labelCount: number;
}

const StyledLabelText = styled(Text)<{ positionPercent: number; textAlign: 'left' | 'center' | 'right' }>(
  css({
    position: 'absolute',
    whiteSpace: 'nowrap',
    margin: 0,
    padding: 0,
  }),
  ({ positionPercent, textAlign }) => {
    let transform = '';
    if (textAlign === 'left') {
      transform = 'translateX(0)';
    } else if (textAlign === 'right') {
      transform = 'translateX(-100%)';
    } else {
      transform = 'translateX(-50%)';
    }
    return {
      left: `${positionPercent}%`,
      transform,
    };
  }
);

const StyledHeaderContainer = styled(Box)(
  css({
    marginLeft: '200px',
    paddingRight: '60px',
    position: 'relative',
    width: 'calc(100% - 200px - 60px)',
  })
);

export const ScaleChartHeader: React.FC<ScaleChartHeaderProps> = ({
  labelCount,
  min,
  max,
}) => {
  const { styleConfig } = useBarChartContext();

  const scaleLabels = Array.from({ length: labelCount }, (_, i) => {
    const labelValue = getLabel({ labelCount, labelIndex: i, min, max });
    const positionPercent = calculatePositionPercent({ value: labelValue, min, max });

    return (
      <StyledLabelText
        data-testid="chart-header-label"
        key={i}
        positionPercent={positionPercent}
        textAlign="center"
        textColor={styleConfig.textColor}
        variant="p-small"
      >
        {formatNumberUSCompact({
          num: labelValue,
        })}
      </StyledLabelText>
    );
  });

  return (
    <Box width={1} mb={12}>
      <StyledHeaderContainer
        aria-hidden="true"
        display={{ _: 'none', sm: 'block' }}
        minHeight="24px"
      >
        {scaleLabels}
      </StyledHeaderContainer>
    </Box>
  );
};
