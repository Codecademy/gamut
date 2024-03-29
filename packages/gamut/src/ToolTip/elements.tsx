import { css } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';

import { Box } from '../Box';
import { Selectors } from '../ButtonBase/ButtonBase';
import {
  toolTipAlignmentVariants,
  toolTipBodyAlignments,
  toolTipBodyCss,
} from './styles';

export const TooltipWrapper = styled.div(
  css({ position: 'relative', display: 'inline-flex' })
);

enum TargetSelectors {
  OUTLINE = '&:before',
  OUTLINE_FOCUS_VISIBLE = '&:focus-visible:before',
}

export const TargetContainer = styled.div(
  css({
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    padding: 0,

    [Selectors.FOCUS_VISIBLE]: {
      outline: 'none',
    },
    [TargetSelectors.OUTLINE]: {
      content: "''",
      position: 'absolute',
      inset: -2,
      borderRadius: '4px',
      border: 2,
      borderColor: 'primary',
      opacity: 0,
      zIndex: 0,
    },
    [TargetSelectors.OUTLINE_FOCUS_VISIBLE]: {
      opacity: 1,
    },
  })
);

export interface ToolTipContainerProps
  extends StyleProps<typeof toolTipAlignmentVariants> {}

export const ToolTipContainer = styled(Box)<ToolTipContainerProps>`
  ${TargetContainer}:hover + &,
  ${TargetContainer}:focus-within + &,
  &:hover {
    opacity: 1;
    visibility: visible;
  }
  ${toolTipAlignmentVariants}
`;

export const ToolTipBody = styled(Box)<
  StyleProps<typeof toolTipBodyAlignments>
>(css({ ...toolTipBodyCss }), toolTipBodyAlignments);
