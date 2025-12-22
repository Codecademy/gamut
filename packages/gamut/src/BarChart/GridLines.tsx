import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { Box } from '../Box';
import { calculatePositionPercent, getLabel } from './utils';

const GridLineContainer = styled(Box)(
  css({
    bottom: 0,
    display: { _: 'none', sm: 'block' },
    left: '200px',
    pointerEvents: 'none',
    position: 'absolute',
    right: '60px',
    top: 0,
    borderLeft: 1,
    borderRight: 1,
    borderColor: 'background-disabled',
    zIndex: 0,
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

export const GridLines: React.FC<GridLinesProps> = ({ tickCount, min, max }) => {
  const lines = Array.from({ length: tickCount }, (_, i) => {
    const labelValue = getLabel({ labelCount: tickCount, labelIndex: i, min, max });
    const positionPercent = calculatePositionPercent({ value: labelValue, min, max });

    return (
      <GridLine
        aria-hidden
        key={i}
        positionPercent={positionPercent}
      />
    );
  });

  return <GridLineContainer aria-hidden>{lines}</GridLineContainer>;
};
