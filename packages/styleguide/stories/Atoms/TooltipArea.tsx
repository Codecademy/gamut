import { Box, ToolTipPosition } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

const tipPositionStyles: Record<ToolTipPosition, string> = {
  'bottom-left': `
    padding-bottom: 5rem;
    padding-left: 12rem;

    [role="tooltip"] {
      margin-left: -14rem;
    }
  `,
  'bottom-right': `
    padding-bottom: 5rem;
  `,
  'top-left': `
    padding-left: 12rem;

    [role="tooltip"] {
      margin-left: -14rem;
    }
  `,
  'top-right': `
    padding-left: 3rem;
    padding-top: 5rem;
  `,
};

const AreaBox = styled(Box)<{ tipPosition: ToolTipPosition }>`
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
