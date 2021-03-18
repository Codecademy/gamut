import { Box, ToolTipPosition } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

const tipPositionStyles: Record<ToolTipPosition, string> = {
  'bottom-left': `
    right: 0;
    margin-right: -0.6rem;
  `,
  'bottom-right': `margin-left: -3rem;`,
  'top-left': `
    margin-right: -0.6rem;
    right: 0;
  `,
  'top-right': `margin-left: -3rem;`,
};

const AreaBox = styled(Box)<{ tipPosition: ToolTipPosition }>`
  margin: 4rem 10rem;

  ${({ tipPosition }) => `
  & [role=tooltip] {
    ${tipPositionStyles[tipPosition]}
  }
  `}
`;

export type ToolTipAreaProps = {
  tipPosition: ToolTipPosition;
};

export const TooltipArea: React.FC<ToolTipAreaProps> = ({
  children,
  tipPosition,
}) => {
  return (
    <AreaBox
      as="span"
      display="inline-block"
      minHeight="5rem"
      tipPosition={tipPosition}
    >
      {children}
    </AreaBox>
  );
};
