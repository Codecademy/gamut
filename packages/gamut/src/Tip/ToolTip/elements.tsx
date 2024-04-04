import styled from '@emotion/styled';

import { Box } from '../../Box';
import { TargetContainer, ToolTipContainerProps } from '../shared/elements';
import { toolTipAlignmentVariants } from '../shared/styles';

export const ToolTipContainer = styled(Box)<ToolTipContainerProps>`
  ${TargetContainer}:hover + &,
  ${TargetContainer}:focus-within + &,
  &:hover {
    opacity: 1;
    visibility: visible;
  }
  ${toolTipAlignmentVariants}
`;
