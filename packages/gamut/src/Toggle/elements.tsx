import {
  css,
  states,
  system,
  theme,
  useVariance,
  variant,
} from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import {
  ComponentProps,
  forwardRef,
} from 'react';
import * as React from 'react';

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

export const ToggleTrack = forwardRef<
  HTMLDivElement,
  StyleProps<typeof ToggleTrackVariants> &
    StyleProps<typeof ToggleTrackSystemProps> &
    React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { rest } = useVariance(
    props as Record<string, unknown>,
    ToggleTrackVariants,
    ToggleTrackSystemProps
  );
  return <div ref={ref} {...rest} />;
});

const circleTransitionStyles = css({
  transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
});

export const Circle = forwardRef<HTMLElement, ComponentProps<typeof Box>>(
  (props, ref) => {
    const { rest } = useVariance(
      props as Record<string, unknown>,
      circleTransitionStyles
    );
    return <Box ref={ref as any} {...(rest as any)} />;
  }
);

const screenReaderOnlyStyles = css({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  whiteSpace: 'nowrap',
  clipPath: 'inset(50%)',
  border: 0,
});

export const ToggleInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const { rest } = useVariance(
    props as Record<string, unknown>,
    screenReaderOnlyStyles
  );
  return <input ref={ref} {...rest} />;
});

const ToggleLabelStates = states({
  disabled: { cursor: 'not-allowed', opacity: 0.5 },
  labelRight: { flexDirection: 'row-reverse' },
});

export type ToggleStyleProps = StyleProps<typeof system.space>;

const toggleLabelBaseStyles = css({
  alignItems: 'center',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  width: 'fit-content',
});

export const ToggleLabel = forwardRef<
  HTMLLabelElement,
  StyleProps<typeof ToggleLabelStates> &
    ToggleStyleProps &
    React.LabelHTMLAttributes<HTMLLabelElement>
>((props, ref) => {
  const { rest } = useVariance(
    props as Record<string, unknown>,
    toggleLabelBaseStyles,
    ToggleLabelStates,
    system.space
  );
  return <label ref={ref} {...rest} />;
});
