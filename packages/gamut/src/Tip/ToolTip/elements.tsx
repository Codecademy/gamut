import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';

import { Box } from '../../Box';
import { toolTipAlignmentVariants } from '../shared/styles/styles';

export interface ToolTipContainerProps
  extends StyleProps<typeof toolTipAlignmentVariants> {}

export const ToolTipContainer = styled(Box)<ToolTipContainerProps>(
  toolTipAlignmentVariants
);
