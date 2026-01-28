import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { useMemo } from 'react';

import { Box } from '../../Box';
import { Text } from '../../Typography';
import { formatNumberUSCompact } from '../utils';
import { useBarChartContext, useLabelPositions } from '../utils/hooks';
import { VerticalSpacer } from './VerticalSpacer';

export interface ScaleChartHeaderProps {
  /** Minimum value on the scale */
  min: number;
  /** Maximum value on the scale */
  max: number;
  /** Number of labels to display */
  labelCount: number;
}

const StyledLabelText = styled(Text)<{
  positionPercent: number;
  textAlign: 'left' | 'center' | 'right';
}>(
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
    alignItems: 'center',
    position: 'relative',
  })
);

const HeaderLabelArea = styled(Box)(
  css({
    minHeight: '24px',
  })
);

export const ScaleChartHeader: React.FC<ScaleChartHeaderProps> = ({
  labelCount,
  min,
  max,
}) => {
  const { translations } = useBarChartContext();
  const labelPositions = useLabelPositions({ min, max, count: labelCount });

  const scaleLabels = useMemo(
    () =>
      labelPositions.map(({ value, positionPercent }) => (
        <StyledLabelText
          key={`label-${value}-${positionPercent}`}
          positionPercent={positionPercent}
          textAlign="center"
          variant="p-small"
        >
          {formatNumberUSCompact({
            num: value,
            locale: translations.locale,
          })}
        </StyledLabelText>
      )),
    [labelPositions, translations.locale]
  );

  return (
    <Box mb={12} width={1}>
      <StyledHeaderContainer
        aria-hidden="true"
        display={{ _: 'none', xs: 'block' }}
      >
        <VerticalSpacer>
          <HeaderLabelArea>{scaleLabels}</HeaderLabelArea>
        </VerticalSpacer>
      </StyledHeaderContainer>
    </Box>
  );
};
