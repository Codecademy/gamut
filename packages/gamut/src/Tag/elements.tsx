import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { css, states, system, theme, variant  } from '@codecademy/gamut-styles';
import { variance } from '@codecademy/variance';
import styled from '@emotion/styled';

import { Anchor } from '../Anchor';
import { Box } from '../Box';
import { IconButton } from '../Button';
import { ButtonSelectors, Selectors } from '../ButtonBase/ButtonBase';
import {
  colorVariants,
  dismissSharedStyles,
  iconButtonOverrides,
  sizeVariants,
  tagWrapperStates,
} from './styles';
import { BaseTagProps } from './types';

export const tagProps = variance.compose(
  system.space,
  system.layout,
  system.typography
);

export const Outline = styled(Box)(
  css({
    // this is a bit of a hack as we don't have access to focus-visible from this component.  if you are not properly dismissing your tags you may see this primary colored outline after clicking X, but otherwise you should never hit this behavior.
    borderRadius: 'md',
    width: '100%',
    maxWidth: 'fit-content',
    overflow: 'hidden',
    '&:focus-within': {
      outline: `2px solid ${theme.colors.primary}`,
      outlineOffset: '2px',
    },
    '&:active': {
      outlineColor: `transparent`,
    },
  }),
  states({
    disabled: {
      cursor: 'not-allowed',
      userSelect: 'none',
    },
    readOnly: {
      borderRadius: 'none',
    }
  })
);

export const TagLabelWrapper = styled(Box)<BaseTagProps>(
  tagProps,
  colorVariants,
  sizeVariants,
  tagWrapperStates,
);

const hoverAndFocus = `${Selectors.HOVER}, ${Selectors.FOCUS}`;
// might need to alter with sizing
// consider adding all the CSS here instead? there's no shared aspect anymore
export const DismissButton = styled(IconButton)(
  css({
    ...dismissSharedStyles,
    ...iconButtonOverrides,
    color: 'background',
    bg: 'text-secondary',
    border: 'none',
    borderRadiusRight: 'md',
    borderRadiusLeft: 'none',
    width: 12,
    [hoverAndFocus]: {
      color: 'background',
      bg: 'secondary-hover',
    },
  })
);

export const DefaultMiniDeleteIcon = styled(MiniDeleteIcon)(
  css({
    width: 12,
    color: 'inherit',
  })
);

export const LargeMiniDeleteIcon = styled(MiniDeleteIcon)(
  css({
    width: 16,
    color: 'inherit',
  })
);

export const TagAnchor = styled(Anchor)(
  variant({
    prop: 'interactiveType',
    base: {
      // might go back to original padding stored as a variable and values used depending on variant
      px: 8,
      textDecoration: 'none',
      [ButtonSelectors.FOCUS_VISIBLE]: {
        outline: 'none',
        border: 'none',
      },
      [ButtonSelectors.DISABLED]: {
        borderColor: 'border-disabled',
        '&:hover': {
          backgroundColor: `${theme.colors['background-current']}`
        }
      },
      [ButtonSelectors.FOCUS]: {
        textDecoration: 'none',
      },
      [ButtonSelectors.HOVER]: {
         // KENNY: this can also work to set the hover + disabled bg color
          // but still gives a TS error
          // ':disabled': {
          //   backgroundColor: `${theme.colors['background-current']}`
          // }
        bg: 'background-hover',
      },
    },
    variants: {
      navigation: {
        color: 'text',
        [ButtonSelectors.ACTIVE]: {
          color: 'background',
          textDecoration: 'none',
        },
      },
      suggestion: {
        color: 'text',
        [ButtonSelectors.ACTIVE]: {
          bg: 'primary',
          color: 'background',
          textDecoration: 'none',
        },
      },
    }
  })
)
