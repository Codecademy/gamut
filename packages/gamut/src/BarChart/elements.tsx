import { states, styledOptions, system, variant } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';

import { Box } from '../Box';

// Minimum bar width in pixels to ensure visibility
export const minBarWidth = 2;

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

const rowBase = {
  '&:nth-of-type(odd)': {
    bg: 'transparent',
  },
  '&:nth-of-type(even)': {
    bg: 'background-selected',
  },
} as const;

export interface RowWrapperProps
  extends StyleProps<typeof rowProps>,
    StyleProps<typeof rowStates> {}

export const RowWrapper = styled(
  Box,
  styledOptions<'div'>(['interactive'])
)<RowWrapperProps>(rowBase, rowProps, rowStates);

const barContainerVariants = variant({
  prop: 'variant',
  defaultVariant: 'default',
  base: {
    position: 'relative',
    height: { _: '12px', sm: '20px' },
    borderRadius: { _: 'md', sm: 'lg' },
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
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'navy-200',
      transitionDelay: '0.1s',
    },
    foreground: {
      top: '1px',
      left: '1px',
      height: 'calc(100% - 2px)',
      borderRadius: 'inherit',
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
    bg: 'navy-200',
    opacity: 0.5,
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
