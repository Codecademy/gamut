import { css, system, theme } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';

import { Box } from '../Box';
import {
  toolTipAlignmentVariants,
  toolTipBodyAlignments,
  toolTipBodyCss,
} from './styles';

export const TooltipWrapper = styled.div(
  css({ position: 'relative', display: 'inline-flex' })
);

export const TargetContainer = styled.div(
  css({
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    padding: 0,

    '&:focus-visible': {
      outline: `0.3rem auto ${theme.colors['primary-hover']}`,
    },
  })
);
const activeStates = system.states({
  selected: {
    '&:hover': {
      visibility: 'hidden',
    },
  },
});

export interface ToolTipContainerProps
  extends StyleProps<typeof toolTipAlignmentVariants>,
    StyleProps<typeof activeStates> {
  hide?: boolean;
}

export const ToolTipContainer = styled(Box)<ToolTipContainerProps>`
  ${TargetContainer}:hover + &,
  ${TargetContainer}:focus-within + &,
  &:hover {
    opacity: 1;
    visibility: ${({ hide }) => (hide ? 'hidden' : 'visible')};
  }
  ${toolTipAlignmentVariants}
`;

export const ToolTipBody = styled(Box)<
  StyleProps<typeof toolTipBodyAlignments>
>(css({ ...toolTipBodyCss }), toolTipBodyAlignments);
