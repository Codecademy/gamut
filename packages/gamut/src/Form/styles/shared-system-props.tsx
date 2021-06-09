import {
  system,
  theme,
  timing,
  transitionConcat,
} from '@codecademy/gamut-styles';

export type conditionalStyleProps = {
  error?: boolean;
  activated?: boolean;
  isFocused?: boolean | null;
  isDisabled?: boolean | null;
};

export enum InputSelectors {
  OUTLINE = '&:before',
  OUTLINE_FOCUS = '&:focus-visible:before',
  HOVER = '&:hover',
  ACTIVE = '&:active',
  PLACEHOLDER = '&:placeholder',
  FOCUS = '&:focus',
  DISABLED = "&:disabled, &[aria-disabled='true']",
  BEFORE = '&::before',
  AFTER = '&::after',
  BEFOREANDAFTER = '&::before, &::after',
  CHECKEDBEFORE = '&:checked + label::before',
  CHECKEDAFTER = '&:checked + label::after',
  FOCUSBEFORE = '&:focus + label::before',
  HOVERFOCUSBEFORE = '&:hover + label::before, &:focus + label::before',
}
export const formBaseComponentStyles = {
  fontWeight: 'base',
  fontSize: 16,
  width: 1,
  outline: 'none',
  bg: 'background',
  textColor: 'text',
  minWidth: 'auto',
} as const;

export const formFieldFocusStyles = {
  borderColor: 'primary',
  boxShadow: `inset 0 0 0 1px ${theme.colors.primary}`,
} as const;

const formFieldBaseDisabledStyles = {
  textColor: 'textMuted',
  borderColor: 'currentColor',
  fontStyle: 'italic',
  cursor: 'not-allowed',
} as const;

const formFieldDisabledStyles = {
  formFieldBaseDisabledStyles,
  bg: 'backgroundEmphasized',
  [InputSelectors.HOVER]: {
    borderColor: 'currentColor',
  },
} as const;

export const formFieldPaddingStyles = {
  py: 12,
  px: 8,
} as const;

export const formBaseFieldStylesObject = {
  ...formBaseComponentStyles,
  transition: transitionConcat(
    ['background-color', 'box-shadow'],
    'slow',
    'ease-in-out'
  ),
  border: 1,
  borderColor: 'secondaryDull',
  borderRadius: '2px',
  [InputSelectors.HOVER]: {
    borderColor: 'primary',
  },
  [InputSelectors.PLACEHOLDER]: {
    borderColor: 'textMuted',
    fontStyle: 'italic',
  },
  [InputSelectors.DISABLED]: {
    ...formFieldDisabledStyles,
  },
} as const;

export const formBaseFieldStyles = system.css(formBaseFieldStylesObject);

export const formFieldStyles = system.css({
  ...formBaseFieldStylesObject,
  ...formFieldPaddingStyles,
  [InputSelectors.FOCUS]: formFieldFocusStyles,
});

export const conditionalStyles = system.variant({
  variants: {
    error: {
      textColor: 'danger',
      borderColor: 'currentColor',
      [InputSelectors.HOVER]: {
        borderColor: 'currentColor',
      },
      [InputSelectors.FOCUS]: {
        borderColor: 'currentColor',
        boxShadow: `inset 0 0 0 1px currentColor`,
      },
    },
    activated: { borderColor: 'currentColor' },
  },
});

export const conditionalStyleState = (error: boolean, activated: boolean) => {
  return error ? 'error' : activated ? 'activated' : undefined;
};

export const radioWrapper = system.css({
  margin: '0.25rem 0',
  width: '100%',
  fontWeight: 'normal',
});

const consistentLabelStyles = {
  content: '""',
  display: 'block',
  width: 20,
  height: 20,
  borderRadius: '100%',
  mr: 8,
} as const;

export const radioLabel = system.css({
  display: 'flex',
  py: 16,
  alignItems: 'center',
  cursor: 'pointer',
  position: 'relative',
  [InputSelectors.BEFOREANDAFTER]: consistentLabelStyles,
  [InputSelectors.BEFORE]: {
    bg: 'background',
    boxShadow: `0 0 0 1px ${theme.colors.primary}`,
    transition: timing.slow,
  },
  [InputSelectors.AFTER]: {
    position: 'absolute',
    transition: transitionConcat(['transform'], 'slow', 'ease-in-out'),
    borderWidth: 5,
    borderStyle: 'solid',
    borderColor: 'background',
    transform: 'scale(0)',
  },
});

export const radioInput = system.css({
  [InputSelectors.CHECKEDAFTER]: {
    bg: 'primary',
    borderWidth: 4,
    borderStyle: 'solid',
    borderColor: 'background',
    transform: 'scale(1)',
  },
  [InputSelectors.CHECKEDBEFORE]: {
    boxShadow: `0 0 0 1px ${theme.colors.primary}`,
  },
  [InputSelectors.CHECKEDAFTER]: {
    boxShadow: `0 0 0 2px ${theme.colors.primary}`,
  },
  [InputSelectors.FOCUSBEFORE]: {
    boxShadow: `0 0 0 2px ${theme.colors.primary}`,
  },
});

export const conditionalRadioLabelStyles = system.variant({
  base: {
    [InputSelectors.BEFORE]: {
      boxShadow: `0 0 0 1px currentColor`,
    },
  },
  variants: {
    error: {
      textColor: 'danger',
    },
    disabled: {
      ...formFieldBaseDisabledStyles,
    },
  },
});

export const conditionalRadioInputStyles = system.variant({
  base: {
    [InputSelectors.CHECKEDBEFORE]: {
      boxShadow: `0 0 0 1px currentColor`,
    },
    [InputSelectors.HOVERFOCUSBEFORE]: {
      boxShadow: `0 0 0 2px currentColor`,
    },
    '': {
      boxShadow: `0 0 0 2px currentColor`,
    },
  },
  variants: {
    error: {
      [InputSelectors.CHECKEDAFTER]: {
        bg: 'danger',
      },
    },
    disabled: {
      ...formFieldBaseDisabledStyles,
      '&:checked + label::after': {
        bg: 'currentColor',
      },
    },
  },
});
