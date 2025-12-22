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
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: 0,
    position: 'relative',
  })
);

const HeaderLeftSpacer = styled(Box)(
  css({
    flexShrink: 0,
    minWidth: '200px',
    pl: 16,
  })
);

const HeaderLabelArea = styled(Box)(
  css({
    flex: 1,
    position: 'relative',
    minHeight: '24px',
  })
);

const HeaderRightSpacer = styled(Box)(
  css({
    flexShrink: 0,
    minWidth: 'min-content',
    pr: 16,
  })
);

export const ScaleChartHeader: React.FC<ScaleChartHeaderProps> = ({
  labelCount,
  min,
  max,
}) => {
  const { styleConfig, unit } = useBarChartContext();

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

  // Ghost element to match the width of XP values column
  const ghostValue = max.toLocaleString() + (unit ? ` ${unit}` : '');

  return (
    <Box width={1} mb={12}>
      <StyledHeaderContainer
        aria-hidden="true"
        display={{ _: 'none', sm: 'flex' }}
      >
        <HeaderLeftSpacer />
        <HeaderLabelArea>{scaleLabels}</HeaderLabelArea>
        <HeaderRightSpacer>
          <Text
            aria-hidden="true"
            color={styleConfig.textColor}
            variant="p-small"
            visibility="hidden"
          >
            {ghostValue}
          </Text>
        </HeaderRightSpacer>
      </StyledHeaderContainer>
    </Box>
  );
};
