import { variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';

import { FlexBox } from '../../Box';
import {
  formFieldFocusStyles,
  formFieldStyles,
  inputSizeStyles,
} from '../../Form/styles';

const shellFocusStyles = variant({
  variants: {
    error: {
      // borderColor: 'feedback-error',
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
 * Shell uses the same style stack as `Input`. `formFieldStyles` targets `&:focus`, but the host is a
 * `div` — focus is on inner spinbuttons, so we mirror `Input` focus visuals with `&:focus-within`.
 */
export const SegmentedShell = styled(FlexBox)<SegmentedShellProps>(
  formFieldStyles,
  inputSizeStyles,
  shellFocusStyles
);
