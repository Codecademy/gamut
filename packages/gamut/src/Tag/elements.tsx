import { MiniDeleteIcon } from '@codecademy/gamut-icons';
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
import { IconButton } from '../Button';
import { Selectors } from '../ButtonBase/ButtonBase';
import { colorVariants, dismissSharedStyles, tagBorderRadius } from './styles';
import { BaseTagProps } from './types';

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

export const DismissButton = styled(IconButton)(
  variant({
    defaultVariant: 'default',
    base: {
      ...dismissSharedStyles,
      border: 1,
      borderColor: 'transparent',
      borderRadiusRight: tagBorderRadius,
      color: 'currentColor',
      width: 12,
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
          bg: 'primary',
        },
        [Selectors.FOCUS]: {
          bg: 'navy-700',
        },
      },
    },
  })
);


export const StyledMiniDeleteIcon = styled(MiniDeleteIcon)(
  css({
    width: 12,
    color: 'inherit',
  })
);
