import { states, styledOptions, system, variant } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';

import { Box } from '../Box';

// Minimum bar width in percentage to ensure visibility
export const minBarWidth = 8;

const rowStates = states({
  interactive: {
    cursor: 'pointer',
    '&:hover': {
      bg: 'background-hover',
    },
    '&:focus-visible': {
      outline: `2px solid`,
      outlineColor: 'primary',
      outlineOffset: 2,
    },
  },
});

const rowProps = variance.compose(
  system.space,
  system.layout,
  system.border,
  system.color
);

export interface RowWrapperProps
  extends StyleProps<typeof rowProps>,
    StyleProps<typeof rowStates> {}

export const RowWrapper = styled(
  Box,
  styledOptions<'div'>(['interactive'])
)<RowWrapperProps>(rowProps, rowStates);

const barContainerVariants = variant({
  prop: 'variant',
  defaultVariant: 'default',
  base: {
    position: 'relative',
    height: { _: '8px', sm: '18px' },
    borderRadius: { _: 'md', sm: 'xl' },
    overflow: 'hidden',
    flexGrow: 1,
    minWidth: 0,
  },
  variants: {
    default: {},
  },
});

export type BarContainerProps = StyleProps<typeof barContainerVariants>;

export const BarContainer = styled(Box)<BarContainerProps>(
  barContainerVariants
);

const barVariants = variant({
  prop: 'barType',
  base: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    borderRadius: 'inherit',
    transition: 'width 0.5s ease-out',
  },
  variants: {
    background: {
      border: 1,
      borderColor: 'border-primary',
      transitionDelay: '0.1s',
    },
    foreground: {
      top: 1,
      height: 'calc(100% - 2px)',
      borderRightWidth: 1,
      borderRightStyle: 'solid',
      borderRightColor: 'border-primary',
    },
  },
});

export type BarElementProps = StyleProps<typeof barVariants>;

export const BarElement = styled(Box)<BarElementProps>(barVariants);

const gridLineVariants = variant({
  prop: 'variant',
  base: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '1px',
    bg: 'border-tertiary',
    opacity: 0.3,
  },
  variants: {
    default: {},
  },
});

export type GridLineProps = StyleProps<typeof gridLineVariants>;

export const GridLine = styled(Box)<GridLineProps>(gridLineVariants);

export const GridContainer = styled(Box)(
  system.layout,
  system.positioning
);

