import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { css, system, theme, variant } from '@codecademy/gamut-styles';
import { variance } from '@codecademy/variance';
import styled from '@emotion/styled';

import { Box, FlexBox } from '../Box';
import { IconButton } from '../Button';
import { ButtonSelectors, Selectors } from '../ButtonBase/ButtonBase';
import {
  colorVariants,
  dismissSharedStyles,
  tagBorderRadius,
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
    borderRadius: tagBorderRadius,
    width: '100%',
    maxWidth: 'fit-content',
    '&:focus-within': {
      outline: `2px solid ${theme.colors.primary}`,
      outlineOffset: '2px',
    },
    '&:active': {
      outlineColor: `transparent`,
    },
  })
);

export const TagLabelWrapper = styled(Box)<BaseTagProps>(
  tagProps,
  colorVariants,
  tagWrapperStates
);

export const DismissButton = styled(IconButton)(
  variant({
    defaultVariant: 'default',
    prop: 'tagType',
    base: {
      ...dismissSharedStyles,
      color: 'background',
      border: 'none',
      borderRadius: `0 ${tagBorderRadius} ${tagBorderRadius} 0`,
      width: 12,
      // This removes a black solid outline
      [ButtonSelectors.OUTLINE_FOCUS_VISIBLE] : {
        opacity: 0
      },
      // This removes the pseudo elements that are used for the focus outline
      '::before, ::after': {
        display: 'none',
      }
    },
    variants: {
      default: {
        bg: 'secondary',
        [`${Selectors.HOVER}, ${Selectors.FOCUS}`]: {
          color: 'background',
          bg: 'secondary-hover',
        },
      },
      grey: {
        bg: 'text-secondary',
        [`${Selectors.HOVER}, ${Selectors.FOCUS}`]: {
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
