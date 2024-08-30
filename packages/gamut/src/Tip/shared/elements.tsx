import { css, timing } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';

import { Box, FlexBox } from '../../Box';
import { Selectors } from '../../ButtonBase/ButtonBase';
import {
  inlineToolTipBodyAlignments,
  toolTipBodyCss,
  toolTipWidthRestrictions,
} from './styles';

const tipWrapperStyles = {
  position: 'relative',
  display: 'inline-flex',
} as const;

export const ToolTipWrapper = styled.div(
  css({
    '&:hover > div, &:focus-within > div': {
      opacity: 1,
      transition: `opacity ${timing.fast} ${timing.base}`,
      visibility: 'visible',
    },
    ...tipWrapperStyles,
  })
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

export const FloatingTipBody = styled(FlexBox)<
  StyleProps<typeof toolTipWidthRestrictions>
>(toolTipWidthRestrictions);
