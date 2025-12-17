import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { Box } from '../Box';

const GridLineContainer = styled(Box)(
  css({
    bottom: 0,
    display: { _: 'none', sm: 'flex' },
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

const GridLineWrapper = styled(Box)(
  css({
    flex: 1,
    display: 'flex',
    height: '100%',
  })
);

const GridLine = styled(Box)(
  css({
    borderLeft: 1,
    borderColorLeft: 'background-disabled',
    height: '100%',
    width: 0,
  })
);

export interface GridLinesProps {
  tickCount: number;
}

export const GridLines: React.FC<GridLinesProps> = ({ tickCount }) => {
  const lines = Array.from({ length: tickCount - 2 }, (_, i) => {
    return (
      <GridLineWrapper aria-hidden justifyContent="center" key={i}>
        <GridLine />
      </GridLineWrapper>
    );
  });

  return <GridLineContainer aria-hidden>{lines}</GridLineContainer>;
};
