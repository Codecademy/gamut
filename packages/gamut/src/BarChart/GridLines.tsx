import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { Box } from '../Box';

const GridLineContainer = styled(Box)(
  css({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: { _: 'none', sm: 'flex' },
    pointerEvents: 'none',
    zIndex: 0,
  })
);

const GridLine = styled(Box)(
  css({
    borderLeft: 1,
    borderColorLeft: 'background-disabled',
    height: '100%',
    flex: 1,
    '&:first-of-type': {
      borderLeft: 'none',
    },
  })
);

export interface GridLinesProps {
  tickCount: number;
}

export const GridLines: React.FC<GridLinesProps> = ({ tickCount }) => {
  const lines = Array.from({ length: tickCount }, (_, i) => (
    <GridLine aria-hidden key={i} />
  ));

  return <GridLineContainer aria-hidden>{lines}</GridLineContainer>;
};
