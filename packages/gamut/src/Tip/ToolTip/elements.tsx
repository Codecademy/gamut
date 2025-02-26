import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';

import { Box } from '../../Box';
import { inlineToolTipState, toolTipAlignmentVariants } from '../shared/styles';

export interface ToolTipContainerProps
  extends StyleProps<typeof toolTipAlignmentVariants>,
    StyleProps<typeof inlineToolTipState> {}

export const ToolTipContainer = styled(Box)<ToolTipContainerProps>(
  toolTipAlignmentVariants,
  inlineToolTipState
);
