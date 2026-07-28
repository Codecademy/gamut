import { css, states, styledOptions, theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';

export interface ChipProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> {
  /**
   * Highlights the Chip's border and background to indicate it is the
   * current selection.
   *
   * Independent of `disabled` - a Chip can be `selected`, `disabled`,
   * both, or neither.
   */
  selected?: boolean;
  /**
   * Dims the Chip and disables pointer interaction.
   *
   * Independent of `selected` - a Chip can be `selected`, `disabled`,
   * both, or neither.
   */
  disabled?: boolean;
}

const chipBaseStyles = css({
  alignItems: 'center',
  bg: 'background-current',
  border: 1,
  borderColor: 'border-secondary',
  borderRadius: 'xl',
  color: 'text',
  cursor: 'pointer',
  display: 'inline-flex',
  fontFamily: 'accent',
  fontSize: 14,
  fontWeight: 400,
  justifyContent: 'center',
  lineHeight: 1.5 as any,
  outline: 'none',
  px: 12,
  py: 6,
  transition:
    'background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease, opacity 0.15s ease',
  whiteSpace: 'nowrap',
  '&:hover': {
    bg: 'background-hover',
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.colors.primary}`,
    outlineOffset: '2px',
  },
});

/**
 * `selected` and `disabled` are independent toggle states - either, both, or
 * neither may be active at once. `states()` merges each active state's
 * styles in declaration order, so because `disabled` is declared after
 * `selected`, its styles win on any overlapping properties. That keeps a
 * Chip that is both `selected` and `disabled` visually dimmed rather than
 * letting the selected styling mask the disabled styling.
 */
const chipStates = states({
  selected: {
    bg: 'background-selected',
    borderColor: 'primary',
    color: 'primary',
    '&:hover': {
      bg: 'background-selected',
    },
  },
  disabled: {
    bg: 'background-disabled',
    borderColor: 'border-disabled',
    color: 'text-disabled',
    cursor: 'not-allowed',
    opacity: 0.5,
    pointerEvents: 'none',
    '&:hover': {
      bg: 'background-disabled',
    },
  },
});

const StyledChip = styled('button', styledOptions)<ChipProps>(
  chipBaseStyles,
  chipStates
);

/**
 * Chip is a small selectable pill. It supports two independent boolean
 * states - `selected` and `disabled` - either of which may be toggled on
 * its own or together.
 */
export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ selected = false, disabled = false, type = 'button', ...rest }, ref) => (
    <StyledChip
      aria-disabled={disabled}
      aria-pressed={selected}
      disabled={disabled}
      ref={ref}
      selected={selected}
      type={type}
      {...rest}
    />
  )
);

Chip.displayName = 'Chip';
