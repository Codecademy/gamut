import {
  css,
  states,
  styledOptions,
  system,
  theme,
} from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import * as React from 'react';

/**
 * System props supported directly on the Chip (spacing, layout, typography).
 */
const chipProps = variance.compose(
  system.space,
  system.layout,
  system.typography
);

/**
 * Base styling shared by every Chip, regardless of `selected`/`disabled` state.
 */
const chipBaseStyling = css({
  alignItems: 'center',
  bg: 'background',
  border: 1,
  borderColor: 'border-secondary',
  borderRadius: 'full',
  color: 'text',
  cursor: 'pointer',
  display: 'inline-flex',
  fontFamily: 'base',
  fontSize: 14,
  fontWeight: 400,
  justifyContent: 'center',
  lineHeight: 1.5 as any,
  outline: 'none',
  px: 12,
  py: 4,
  transitionDuration: '150ms',
  transitionProperty: 'background-color, border-color, color, opacity',
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
 * `selected` and `disabled` are independent toggles - either, both, or
 * neither can be active at once. `states()` merges each one's styles in
 * order when its matching boolean prop is true, so a Chip that is both
 * selected and disabled gets the union of both style sets (a dimmed,
 * pointer-events-disabled chip that still shows its selected border/bg).
 */
const chipStates = states({
  selected: {
    bg: 'background-selected',
    borderColor: 'primary',
    color: 'text',
  },
  disabled: {
    cursor: 'not-allowed',
    opacity: 0.5,
    pointerEvents: 'none',
    '&:hover': {
      bg: 'background-selected',
    },
  },
});

export interface ChipStyleProps extends StyleProps<typeof chipProps> {
  /**
   * Highlights the Chip's border/background as the active selection.
   * Independent of `disabled` - a Chip may be selected and disabled at
   * the same time.
   */
  selected?: boolean;
  /**
   * Dims the Chip and disables pointer interaction. Independent of
   * `selected` - a Chip may be disabled while still appearing selected.
   */
  disabled?: boolean;
}

const ChipBase = styled('button', styledOptions<'button'>())<ChipStyleProps>(
  chipProps,
  chipBaseStyling,
  chipStates
);

export interface ChipProps
  extends ChipStyleProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> {}

/**
 * Chip is a small selectable pill. `selected` and `disabled` are
 * independent booleans - toggling one never implies or overrides the
 * other, and both may be applied simultaneously.
 */
export const Chip: React.FC<ChipProps> = ({
  selected = false,
  disabled = false,
  type = 'button',
  ...rest
}) => (
  <ChipBase
    aria-pressed={selected}
    disabled={disabled}
    selected={selected}
    type={type}
    {...rest}
  />
);
