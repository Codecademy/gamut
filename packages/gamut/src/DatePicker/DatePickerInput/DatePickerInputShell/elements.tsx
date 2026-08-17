import { css, variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';

import { Box, FlexBox } from '../../../Box';
import { FormError } from '../../../Form/elements/FormError';
import {
  formFieldFocusStyles,
  formFieldStyles,
  inputSizeStyles,
} from '../../../Form/styles';
import {
  DATE_PICKER_ERROR_SLOT_HEIGHT,
  DATE_PICKER_FIELD_WIDTH,
} from '../../constants';

export const DatePickerInputShellContainer = styled(Box)(
  css({
    width: 'fit-content',
  })
);

export const DatePickerInputShellField = styled(Box)(
  css({
    position: 'relative',
    width: 'fit-content',
  })
);

export const DatePickerInputShellErrorSpacer = styled(Box)(
  css({
    minHeight: DATE_PICKER_ERROR_SLOT_HEIGHT,
  })
);

export const DatePickerInputShellError = styled(FormError)(
  css({
    left: 0,
    position: 'absolute',
    top: '100%',
    width: DATE_PICKER_FIELD_WIDTH,
    whiteSpace: 'normal',
  })
);

const shellFocusStyles = variant({
  variants: {
    error: {
      borderColor: 'feedback-error',
      '&:hover': {
        borderColor: 'feedback-error',
      },
      '&:focus': {
        borderColor: 'feedback-error',
        boxShadow: `inset 0 0 0 1px feedback-error`,
      },
      '&:focus-within': {
        borderColor: 'feedback-error',
        boxShadow: `inset 0 0 0 1px feedback-error`,
      },
    },
    default: {
      '&:focus-within': formFieldFocusStyles,
    },
  },
});

interface SegmentedShellProps
  extends StyleProps<typeof inputSizeStyles>,
    StyleProps<typeof shellFocusStyles> {}

/**
 * Shell uses the same styles as `Input`. `formFieldStyles` targets `&:focus`, but the host is a
 * `div` — focus is on inner spinbuttons, so we mirror `Input` focus visuals with `&:focus-within`.
 */
export const SegmentedShell = styled(FlexBox)<SegmentedShellProps>(
  formFieldStyles,
  inputSizeStyles,
  shellFocusStyles,
  css({
    flexGrow: 0,
    flexShrink: 0,
    maxWidth: DATE_PICKER_FIELD_WIDTH,
    minWidth: DATE_PICKER_FIELD_WIDTH,
    width: DATE_PICKER_FIELD_WIDTH,
  })
);
