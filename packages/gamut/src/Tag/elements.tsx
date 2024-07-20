import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { css, system, theme, variant } from '@codecademy/gamut-styles';
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

// KENNY: Is this needed anymore? can't I add a focus-visible to the dismiss button?
// KENNY: is this to perserve the outside focus on the tag too?
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

export const TagWrapper = styled(Box)<BaseTagProps>(tagProps, colorVariants);

export const DismissButton = styled(IconButton)(
  variant({
    defaultVariant: 'default',
    prop: 'tagType',
    base: {
      ...dismissSharedStyles,
      border: 1,
      borderColor: 'transparent',
      borderRadiusRight: tagBorderRadius,
      color: 'currentColor',
      width: 12,
    },
    // KENNY: could maybe add shared pseudo styles to both default and grey
    variants: {
      default: {
        [Selectors.HOVER]: {
          color: 'background',
          bg: 'secondary-hover',
        },
        [Selectors.FOCUS]: {
          color: 'background',
          bg: 'background-selected',
        },
      },
      grey: {
        [Selectors.HOVER]: {
          color: 'background',
          bg: 'secondary-hover',
        },
        [Selectors.FOCUS]: {
          color: 'background',
          bg: 'secondary-hover',
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
