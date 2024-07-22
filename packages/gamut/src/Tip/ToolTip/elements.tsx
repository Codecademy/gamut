import styled from '@emotion/styled';

import { Box } from '../../Box';
import { ToolTipContainerProps } from '../shared/elements';
import { toolTipAlignmentVariants } from '../shared/styles';

export const ToolTipContainer = styled(Box)<ToolTipContainerProps>(
  toolTipAlignmentVariants
);
