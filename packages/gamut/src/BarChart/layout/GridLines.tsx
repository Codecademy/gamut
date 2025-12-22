import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { Box } from '../../Box';
import { useLabelPositions } from '../utils';
import { VerticalSpacer } from './VerticalSpacer';

const GridLineWrapper = styled(Box)(
  css({
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    pointerEvents: 'none',
    zIndex: 0,
  })
);

const GridLineContainer = styled(Box)(
  css({
    bottom: 0,
    display: { _: 'none', sm: 'block' },
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderLeft: 1,
    borderRight: 1,
    borderColor: 'background-disabled',
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
  min: number;
  max: number;
}

export const GridLines: React.FC<GridLinesProps> = ({
  tickCount,
  min,
  max,
}) => {
  const labelPositions = useLabelPositions({ min, max, count: tickCount });

  const lines = labelPositions.map(({ positionPercent, value }) => (
    <GridLine
      aria-hidden
      key={`gridline-${value}-${positionPercent}`}
      positionPercent={positionPercent}
    />
  ));

  return (
    <GridLineWrapper aria-hidden>
      <VerticalSpacer>
        <GridLineContainer>{lines}</GridLineContainer>
      </VerticalSpacer>
    </GridLineWrapper>
  );
};
