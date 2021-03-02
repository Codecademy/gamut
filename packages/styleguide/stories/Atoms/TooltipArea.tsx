import { Box, ToolTipPosition } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

const tipPositionStyles: Record<ToolTipPosition, string> = {
  'bottom-left': `
    padding-bottom: 5rem;
    padding-left: 10rem;

    [role="tooltip"] {
      margin-left: -14rem;
    }
  `,
  'bottom-right': `
    padding-bottom: 5rem;

    [role="tooltip"] {
      margin-left: -0.65rem;
    }
  `,
  'top-left': `
    padding-left: 10rem;

    [role="tooltip"] {
      margin-left: -14rem;
    }
  `,
  'top-right': `
    padding-left: 3rem;
    padding-top: 5rem;

    [role="tooltip"] {
      margin-left: -0.65rem;
    }
  `,
};

const AreaBox = styled(Box)<{ tipPosition: ToolTipPosition }>`
  padding: 1rem;
  ${({ tipPosition }) => tipPositionStyles[tipPosition]}
`;

export type ToolTipAreaProps = {
  tipPosition: ToolTipPosition;
};

export const TooltipArea: React.FC<ToolTipAreaProps> = ({
  children,
  tipPosition,
}) => {
  return (
    <AreaBox as="span" display="inline-block" tipPosition={tipPosition}>
      {children}
    </AreaBox>
  );
};
