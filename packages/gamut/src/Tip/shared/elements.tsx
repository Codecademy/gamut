import { css, states, timing } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';

import { Box, FlexBox } from '../../Box';
import { Selectors } from '../../ButtonBase/ButtonBase';
import { Popover } from '../../Popover';
import {
  inlineToolTipBodyAlignments,
  narrowWidth,
  toolTipBodyCss,
  toolTipWidthRestrictions,
} from './styles/styles';

const tipWrapperStyles = {
  position: 'relative',
  display: 'inline-flex',
  overflowWrap: 'break-word',
} as const;

const floatingTipTextStates = states({
  isHoverType: { alignItems: 'flexStart' },
  narrow: { width: narrowWidth },
  horizNarrow: { maxWidth: narrowWidth },
});

const inlineTipStates = states({
  inheritDims: { height: 'inherit', width: 'inherit' },
});

export const FloatingTipTextWrapper = styled(FlexBox)<
  StyleProps<typeof floatingTipTextStates>
>(
  css({
    flexDirection: 'column',
    overflowWrap: 'break-word',
  }),
  floatingTipTextStates
);

export const ToolTipWrapper = styled.div<StyleProps<typeof inlineTipStates>>(
  css({
    '&:hover > div, &:focus-within > div': {
      opacity: 1,
      transition: `opacity ${timing.fast} ${timing.base}`,
      visibility: 'visible',
    },
    ...tipWrapperStyles,
  }),
  inlineTipStates
);

export const InfoTipWrapper = styled.div(
  css({
    ...tipWrapperStyles,
  })
);

enum TargetSelectors {
  OUTLINE = '&:before',
  OUTLINE_FOCUS_VISIBLE = '&:focus-visible:before',
}

export const TargetContainer = styled(Box)(
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
      borderRadius: 'md',
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

export const TipBody = styled(Box)<
  StyleProps<typeof inlineToolTipBodyAlignments>
>(css({ ...toolTipBodyCss }), inlineToolTipBodyAlignments);

export const FloatingTipBody = styled(Popover)<
  StyleProps<typeof toolTipWidthRestrictions>
>(toolTipWidthRestrictions);
