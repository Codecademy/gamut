import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { Box, FlexBox } from '../Box';
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

const StyledHeaderContainer = styled(FlexBox)(
  css({
    marginLeft: '200px',
    paddingRight: '60px',
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
    const isFirst = i === 0;
    const isLast = i === labelCount - 1;
    const textAlign = isFirst ? 'left' : isLast ? 'right' : 'center';

    return (
      <StyledLabelText
        data-testid="chart-header-label"
        key={i}
        textAlign={textAlign}
        textColor={styleConfig.textColor}
        variant="p-small"
      >
        {formatNumberUSCompact({
          num: getLabel({ labelCount, labelIndex: i, min, max }),
        })}
      </StyledLabelText>
    );
  });

  return (
    <Box bg="red" width={1}>
      <StyledHeaderContainer
        aria-hidden="true"
        display={{ _: 'none', sm: 'flex' }}
        justifyContent="space-between"
        mb={8}
      >
        {scaleLabels}
      </StyledHeaderContainer>
    </Box>
  );
};
