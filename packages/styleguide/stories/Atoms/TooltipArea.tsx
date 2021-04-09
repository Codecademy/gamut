import { Box, ToolTipAlignment } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

const tipAlignmentStyles: Record<ToolTipAlignment, string> = {
  'bottom-left': `
    padding-bottom: 5rem;
    padding-left: 10rem;
  `,
  'bottom-right': `
    padding-bottom: 5rem;
  `,
  'top-left': `
    padding-left: 10rem;
  `,
  'top-right': `
    padding-left: 3rem;
    padding-top: 5rem;
  `,
};

const AreaBox = styled(Box)<{ tipAlignment: ToolTipAlignment }>`
  padding: 1rem;
  ${({ tipAlignment }) => tipAlignmentStyles[tipAlignment]}
`;

export type ToolTipAreaProps = {
  tipAlignment: ToolTipAlignment;
};

export const TooltipArea: React.FC<ToolTipAreaProps> = ({
  children,
  tipAlignment,
}) => {
  return (
    <AreaBox as="span" display="inline-block" tipAlignment={tipAlignment}>
      {children}
    </AreaBox>
  );
};
