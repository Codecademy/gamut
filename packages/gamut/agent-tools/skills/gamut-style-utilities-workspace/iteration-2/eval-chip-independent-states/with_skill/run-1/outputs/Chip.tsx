import { css, states, theme } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import { ButtonHTMLAttributes, FC } from 'react';

/**
 * Static shape/typography shared by every Chip, regardless of state.
 */
const chipBaseStyles = css({
  alignItems: 'center',
  bg: 'background',
  border: 1,
  borderColor: 'border',
  borderRadius: 'max',
  color: 'text',
  cursor: 'pointer',
  display: 'inline-flex',
  fontSize: 14,
  fontWeight: 'title',
  justifyContent: 'center',
  lineHeight: 1.5 as any,
  px: 12,
  py: 4,
  transition:
    'background-color 0.2s ease, border-color 0.2s ease, opacity 0.2s ease',
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
 * neither can be applied at once, so they're modeled as `states()` keys
 * rather than a mutually-exclusive `variant()`.
 */
const chipStates = states({
  selected: {
    bg: 'primary',
    borderColor: 'primary',
    color: 'background',
    '&:hover': {
      bg: 'primary-hover',
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

const ChipBase = styled.button(chipBaseStyles, chipStates);

export type ChipProps = StyleProps<typeof chipStates> &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>;

/**
 * A small selectable pill. `selected` and `disabled` are independent toggles:
 * a Chip can be selected-and-disabled, selected-and-enabled,
 * unselected-and-disabled, or unselected-and-enabled.
 */
export const Chip: FC<ChipProps> = ({
  selected,
  disabled,
  children,
  ...rest
}) => (
  <ChipBase
    aria-pressed={selected}
    disabled={disabled}
    selected={selected}
    type="button"
    {...rest}
  >
    {children}
  </ChipBase>
);
