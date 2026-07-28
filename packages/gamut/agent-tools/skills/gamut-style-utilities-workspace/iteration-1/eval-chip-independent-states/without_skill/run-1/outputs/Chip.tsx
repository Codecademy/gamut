import { styledOptions, system } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import { ButtonHTMLAttributes, forwardRef } from 'react';

/**
 * Selectors used for interactive/focus styling on the underlying `<button>`.
 */
enum ChipSelectors {
  HOVER = '&:hover',
  FOCUS_VISIBLE = '&:focus-visible',
}

/**
 * Style props Chip forwards through to `variance`, letting consumers tweak
 * spacing/typography the same way other Gamut components do.
 */
const chipLayoutProps = variance.compose(system.space, system.typography);

type ChipLayoutProps = StyleProps<typeof chipLayoutProps>;

/**
 * `selected` and `disabled` are independent toggles - either, both, or
 * neither can be applied at once. `system.states` (unlike `system.variant`)
 * merges every truthy state's styles together rather than picking a single
 * winner, which is exactly what we need here:
 *  - `selected` on its own highlights the chip as the active choice.
 *  - `disabled` on its own dims an unselected chip and removes interaction.
 *  - both together dim a *selected* chip without hiding that it was chosen.
 */
const chipStates = system.states({
  selected: {
    bg: 'background-selected',
    border: 1,
    borderColor: 'primary',
    textColor: 'text',
    fontWeight: 'title',
  },
  disabled: {
    cursor: 'not-allowed',
    opacity: 0.5,
    pointerEvents: 'none',
  },
});

type ChipStateProps = StyleProps<typeof chipStates>;

export interface ChipProps
  extends ChipLayoutProps,
    ChipStateProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> {
  /**
   * Marks the chip as the currently chosen option. Purely visual and does
   * not, by itself, affect interactivity - combine with `disabled` to
   * represent a selected-but-locked chip.
   */
  selected?: boolean;
  /**
   * Dims the chip, strips pointer/keyboard interaction, and sets the native
   * `disabled` attribute. Independent of `selected`, so a disabled chip can
   * still visually indicate it is selected.
   */
  disabled?: boolean;
}

const StyledChip = styled(
  'button',
  styledOptions<'button'>(['selected'])
)<ChipProps>(
  system.css({
    alignItems: 'center',
    bg: 'background',
    border: 1,
    borderColor: 'border-tertiary',
    borderRadius: 'full',
    color: 'inherit',
    cursor: 'pointer',
    display: 'inline-flex',
    fontFamily: 'inherit',
    fontSize: 14,
    justifyContent: 'center',
    lineHeight: 'title' as any,
    outline: 'none',
    px: 16,
    py: 8,
    textColor: 'text',
    transition:
      'background-color 120ms ease, border-color 120ms ease, opacity 120ms ease',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    [ChipSelectors.HOVER]: {
      bg: 'background-hover',
    },
    [ChipSelectors.FOCUS_VISIBLE]: {
      outline: '2px solid',
      outlineColor: 'primary',
      outlineOffset: 2,
    },
  }),
  chipStates,
  chipLayoutProps
);

/**
 * Chip
 *
 * A small selectable pill control with two independent boolean states:
 * `selected` (highlights the border/background) and `disabled` (dims it and
 * disables pointer interaction). Both may be set at the same time.
 */
export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  (
    { children, disabled = false, selected = false, type = 'button', ...rest },
    ref
  ) => (
    <StyledChip
      ref={ref}
      type={type}
      aria-disabled={disabled}
      aria-pressed={selected}
      disabled={disabled}
      selected={selected}
      {...rest}
    >
      {children}
    </StyledChip>
  )
);

Chip.displayName = 'Chip';
