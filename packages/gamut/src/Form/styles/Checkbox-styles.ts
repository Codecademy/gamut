import { system, theme, transitionConcat } from '@codecademy/gamut-styles';

import { formBaseStyles, formFieldBaseDisabledStyles, InputSelectors } from '.';

export const checkboxLabel = system.css({
  display: 'flex',
  alignItems: 'flex-start',
  cursor: 'pointer',
  m: 4,
  px: 0,
  py: 16,
  ...formBaseStyles,
});

export const checkboxLabelStates = system.states({
  disabled: {
    cursor: 'not-allowed',
  },
});

export const checkboxPadding = system.variant({
  defaultVariant: 'base',
  prop: 'spacing',
  variants: {
    base: {
      py: 16,
    },
    tight: {
      py: 4,
    },
  },
});

export const checkboxElement = system.css({
  position: 'relative',
  mr: 8,
  minWidth: 22,
  width: 22,
  height: 22,
  borderColor: 'border-primary',
  borderRadius: '4px' as keyof typeof theme.borderRadii, // hardcoded so that it is not impacted by the theme's border-radius token
  borderStyle: 'solid',
  borderWidth: '2px',
  transition: transitionConcat(
    ['transform', 'outline', 'background-color', 'box-shadow'],
    'slow',
    'ease-in-out'
  ),
  [InputSelectors.HOVER]: {
    outline: `2px solid   ${theme.colors.primary}`,
    outlineOffset: '2px',
  },
});

export const polyline = system.css({
  color: 'background',
});

export const checkboxTextStates = system.states({
  multiline: {
    fontSize: 14,
  },
  disabled: formFieldBaseDisabledStyles,
});

export const checkboxElementStates = system.states({
  multiline: {
    mt: 4,
  },
  active: {
    color: 'primary',
    borderColor: 'primary',
  },
  disabled: {
    color: 'text-disabled',
    [InputSelectors.HOVER]: {
      outline: 'none',
    },
  },
  hasBg: {
    bg: 'currentColor',
  },
  hideBorder: {
    borderColor: 'transparent',
  },
});

export const checkboxInput = system.css({
  [InputSelectors.FOCUS_LABEL_DIV_CHILD]: {
    outline: `2px solid ${theme.colors.primary}`,
    outlineOffset: '2px',
  },
});
