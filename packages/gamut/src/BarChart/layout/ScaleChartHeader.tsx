import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { useMemo } from 'react';

import { Box, FlexBox } from '../../Box';
import { Text } from '../../Typography';
import { ScaleAxisLayoutProps } from '../shared/types';
import { formatNumberUnitCompact } from '../utils';
import { useBarChartContext, useLabelPositions } from '../utils/hooks';
import { LabelSpacer } from './LabelSpacer';

const StyledLabelText = styled(Text)<{
  positionPercent: number;
  textAlign: 'left' | 'center' | 'right';
}>(
  css({
    position: 'absolute',
    whiteSpace: 'nowrap',
    m: 0,
    p: 0,
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

const StyledHeaderContainer = styled(FlexBox)(
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

export const ScaleChartHeader: React.FC<ScaleAxisLayoutProps> = ({
  maxScaleValue,
  tickCount,
}) => {
  const { translations } = useBarChartContext();
  const labelPositions = useLabelPositions({
    maxScaleValue,
    tickCount,
  });

  const scaleLabels = useMemo(
    () =>
      labelPositions.map(({ value, positionPercent }) => (
        <StyledLabelText
          key={`label-${value}-${positionPercent}`}
          positionPercent={positionPercent}
          textAlign="center"
          variant="p-small"
        >
          {formatNumberUnitCompact({
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
        display={{ _: 'none', c_xs: 'block' }}
      >
        <LabelSpacer>
          <HeaderLabelArea>{scaleLabels}</HeaderLabelArea>
        </LabelSpacer>
      </StyledHeaderContainer>
    </Box>
  );
};
