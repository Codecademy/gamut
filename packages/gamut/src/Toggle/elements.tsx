import {
  screenReaderOnly,
  states,
  system,
  theme,
  variant,
} from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Box } from '../Box';

export const sizes = {
  medium: {
    height: '30px',
    width: '60px',
  },
  small: {
    height: '18px',
    width: '36px',
  },
} as const;

const ToggleTrackVariants = variant({
  base: {
    border: 'none',
    cursor: 'inherit',
    transition: 'background-color 0.2s ease',
    borderColor: 'primary',
    borderRadius: 'full',
    position: 'relative',
    '&:after': {
      content: '""',
      transition: 'opacity 0.2s ease',
      opacity: 0,
      borderRadius: 'inherit',
      position: 'absolute',
      width: 'calc(100% + 8px)',
      height: 'calc(100% + 8px)',
      top: '-4px',
      left: '-4px',
      borderColor: 'inherit',
      borderStyle: 'solid',
      borderWidth: 2,
    },
    '&:focus, &:focus-within': {
      outline: `3px solid ${theme.colors.primary}`,
      outlineOffset: '2px',
    },
  },
  prop: 'size',
  defaultVariant: 'medium',
  variants: sizes,
});

const ToggleTrackSystemProps = variance.compose(system.space, system.color);

export const ToggleTrack = styled.div<
  StyleProps<typeof ToggleTrackVariants> &
    StyleProps<typeof ToggleTrackSystemProps>
>(ToggleTrackVariants, ToggleTrackSystemProps);

export const Circle = styled(Box)(
  css({
    transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
  })
);

export const ToggleInput = styled.input(screenReaderOnly);

const ToggleLabelStates = states({
  disabled: { cursor: 'not-allowed', opacity: 0.5 },
  labelRight: { flexDirection: 'row-reverse' },
});

export type ToggleStyleProps = StyleProps<typeof system.space>;

export const ToggleLabel = styled.label<
  StyleProps<typeof ToggleLabelStates> & ToggleStyleProps
>(
  css({
    alignItems: 'center',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    width: 'fit-content',
  }),
  ToggleLabelStates,
  system.space
);
