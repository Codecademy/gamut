import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { useMemo } from 'react';

import { Box } from '../../Box';
import { useLabelPositions } from '../utils/hooks';
import { LabelSpacer } from './LabelSpacer';

const GridLineWrapper = styled(Box)(
  css({
    inset: 0,
    pointerEvents: 'none',
    position: 'absolute',

    zIndex: 0,
  })
);

const GridLineContainer = styled(Box)(
  css({
    borderColor: 'background-disabled',
    borderX: 1,
    display: { _: 'none', c_xs: 'block' },
    inset: 0,
    position: 'absolute',
  })
);

const GridLine = styled(Box)<{ positionPercent: number }>(
  css({
    borderLeft: 1,
    borderColorLeft: 'background-disabled',
    height: '100%',
    position: 'absolute',
    top: 0,
    width: 0,
  }),
  ({ positionPercent }) => ({
    left: `${positionPercent}%`,
    transform: 'translateX(-50%)',
  })
);

export interface GridLinesProps {
  tickCount: number;
  max: number;
}

export const GridLines: React.FC<GridLinesProps> = ({ tickCount, max }) => {
  const labelPositions = useLabelPositions({ max, count: tickCount });

  const lines = useMemo(
    () =>
      labelPositions.map(({ positionPercent, value }) => (
        <GridLine
          aria-hidden
          key={`gridline-${value}-${positionPercent}`}
          positionPercent={positionPercent}
        />
      )),
    [labelPositions]
  );

  return (
    <GridLineWrapper aria-hidden>
      <LabelSpacer>
        <GridLineContainer>{lines}</GridLineContainer>
      </LabelSpacer>
    </GridLineWrapper>
  );
};
