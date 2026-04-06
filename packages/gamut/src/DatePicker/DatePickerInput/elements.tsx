import { css, theme } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';

import { FlexBox } from '../../Box';
import {
  conditionalStyles,
  formFieldFocusStyles,
  formFieldStyles,
  inputSizeStyles,
} from '../../Form/styles';

interface SegmentedShellProps
  extends StyleProps<typeof conditionalStyles>,
    StyleProps<typeof inputSizeStyles> {}

/**
 * Shell uses the same style stack as `Input`. `formFieldStyles` targets `&:focus`, but the host is a
 * `div` — focus is on inner spinbuttons, so we mirror `Input` focus visuals with `&:focus-within`.
 */
export const SegmentedShell = styled(FlexBox)<SegmentedShellProps>(
  formFieldStyles,
  conditionalStyles,
  inputSizeStyles,
  ({ variant }) =>
    css({
      '&:focus-within':
        variant === 'error'
          ? {
              borderColor: 'feedback-error',
              boxShadow: `inset 0 0 0 1px ${theme.colors['feedback-error']}`,
            }
          : formFieldFocusStyles,
    })
);
