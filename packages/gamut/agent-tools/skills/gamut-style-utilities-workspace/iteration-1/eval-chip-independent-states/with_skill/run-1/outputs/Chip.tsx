import { css, states } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import * as React from 'react';

/**
 * `selected` and `disabled` are independent toggles — either, both, or
 * neither may be true at the same time. `states()` applies each block's
 * styles based on its own boolean prop, so the two never clobber each other
 * the way a `variant()` mode map would.
 */
const chipStates = states({
  base: {
    alignItems: 'center',
    bg: 'background',
    border: 1,
    borderColor: 'border-primary',
    borderRadius: 'full',
    color: 'text',
    cursor: 'pointer',
    display: 'inline-flex',
    fontSize: 14,
    justifyContent: 'center',
    lineHeight: 1.5 as any,
    px: 12,
    py: 4,
    transition:
      'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease',
    '&:hover': {
      bg: 'background-hover',
    },
    '&:focus-visible': {
      outline: '2px solid currentColor',
      outlineOffset: '2px',
    },
  },
  selected: {
    bg: 'background-selected',
    borderColor: 'primary',
    color: 'primary',
  },
  disabled: {
    cursor: 'not-allowed',
    opacity: 0.5,
    pointerEvents: 'none',
    '&:hover': {
      bg: 'background',
    },
  },
});

export type ChipStyleProps = StyleProps<typeof chipStates>;

const ChipBase = styled.button<ChipStyleProps>(
  css({
    appearance: 'none',
    outline: 'none',
    userSelect: 'none',
    whiteSpace: 'nowrap',
  }),
  chipStates
);

export type ChipProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'disabled'
> & {
  /**
   * Highlights the Chip's border, background, and text to show it is the
   * active/selected choice. Independent of `disabled` — a Chip can be
   * selected and disabled at the same time.
   */
  selected?: boolean;
  /**
   * Dims the Chip and disables pointer interaction. Independent of
   * `selected` — a Chip can be disabled while still showing as selected.
   */
  disabled?: boolean;
};

export const Chip: React.FC<ChipProps> = ({
  selected = false,
  disabled = false,
  type = 'button',
  ...rest
}) => {
  return (
    <ChipBase
      aria-disabled={disabled}
      aria-selected={selected}
      disabled={disabled}
      selected={selected}
      type={type}
      {...rest}
    />
  );
};
