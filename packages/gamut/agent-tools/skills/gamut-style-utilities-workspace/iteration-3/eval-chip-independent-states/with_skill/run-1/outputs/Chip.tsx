import { css, states, theme } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import React from 'react';

/**
 * Static, non-toggled appearance shared by every Chip regardless of
 * `selected` / `disabled` state.
 */
const chipBaseStyles = css({
  alignItems: 'center',
  bg: 'background',
  border: 1,
  borderColor: 'border-secondary',
  borderRadius: 'full',
  color: 'text',
  cursor: 'pointer',
  display: 'inline-flex',
  fontSize: 14,
  fontWeight: 'base',
  justifyContent: 'center',
  lineHeight: 'base',
  px: 12,
  py: 4,
  transition:
    'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, opacity 0.2s ease',
  '&:hover': {
    bg: 'background-hover',
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.colors.primary}`,
    outlineOffset: '2px',
  },
});

/**
 * `selected` and `disabled` are independent booleans — either, both, or
 * neither can be true at once. `states()` applies each block whenever its
 * matching prop is truthy, so the two never clobber each other's keys.
 */
export const chipStates = states({
  selected: {
    bg: 'background-selected',
    borderColor: 'primary',
    color: 'text-accent',
    fontWeight: 'title',
  },
  disabled: {
    cursor: 'not-allowed',
    opacity: 0.5,
    pointerEvents: 'none',
  },
});

const StyledChip = styled.button<StyleProps<typeof chipStates>>(
  chipBaseStyles,
  chipStates
);

export type ChipProps = StyleProps<typeof chipStates> &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>;

/**
 * A small selectable pill. `selected` highlights the border/background to
 * indicate the current choice; `disabled` dims the Chip and disables pointer
 * events. The two flags are independent and may both be set at the same
 * time (e.g. a Chip that is selected but has become disabled).
 */
export const Chip: React.FC<ChipProps> = ({
  selected,
  disabled,
  type = 'button',
  ...rest
}) => (
  <StyledChip
    type={type}
    selected={selected}
    disabled={disabled}
    aria-pressed={selected}
    aria-disabled={disabled}
    tabIndex={disabled ? -1 : 0}
    {...rest}
  />
);
