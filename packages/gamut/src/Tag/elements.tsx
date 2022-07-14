import {
  Background,
  css,
  system,
  theme,
  variant,
} from '@codecademy/gamut-styles';
import { variance } from '@codecademy/variance';
import styled from '@emotion/styled';

import { Box } from '../Box';
import { ButtonBase } from '../ButtonBase';
import { Selectors } from '../ButtonBase/ButtonBase';
import { BaseTagProps } from './types';

const tagBorderRadius = '4px';

export const colorVariants = variant({
  defaultVariant: 'default',
  base: {
    alignItems: 'center',
    borderRadius: tagBorderRadius,
    display: 'flex',
    height: '24px',
    justifyContent: 'center',
    width: 'fit-content',
    maxWidth: '100%',
  },
  variants: {
    default: {
      bg: `background-current`,
      color: 'text',
    },
    grey: {
      bg: `navy-500`,
      color: 'white',
    },
  },
});

export const tagProps = variance.compose(
  system.space,
  system.layout,
  system.typography
);

export const Outline = styled(Box)(
  css({
    // this is a bit of a hack as we don't have access to focus-visible from this component.  if you are not properly dismissing your tags you may see this primary colored outline after clicking X, but otherwise you should never hit this behavior.

    borderRadius: tagBorderRadius,
    width: 'fit-content',
    maxWidth: '100%',
    '&:focus-within': {
      outline: `2px solid ${theme.colors.primary}`,
      outlineOffset: '2px',
    },
    '&:active': {
      outlineColor: `transparent`,
    },
  })
);

export const TagWrapper = styled(Background)<BaseTagProps>(
  tagProps,
  colorVariants
);

export const DeleteButton = styled(ButtonBase)(
  variant({
    defaultVariant: 'default',
    base: {
      alignItems: 'center',
      border: 1,
      borderColor: 'transparent',
      borderRadiusRight: tagBorderRadius,
      color: 'currentColor',
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      minWidth: '24px',
    },
    variants: {
      default: {
        [Selectors.HOVER]: {
          bg: 'background-hover',
        },
        [Selectors.FOCUS]: {
          bg: 'background-selected',
        },
      },
      grey: {
        [Selectors.HOVER]: {
          bg: 'navy-600',
        },
        [Selectors.FOCUS]: {
          bg: 'navy-700',
        },
      },
    },
  })
);
