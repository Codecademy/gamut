import { css, states, variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';

const listVariants = variant({
  prop: 'variant',
  defaultVariant: 'slat',
  base: {
    display: 'grid',
    gridAutoRows: '1fr',
    gridTemplateColumns: 'minmax(0, 1fr)',
  },
  variants: {
    slat: {
      border: 1,
      borderRadius: '2px',
      overflow: 'hidden',
    },
    table: {},
    bar: {
      gap: 16,
    },
  },
});

export const ListEl = styled.div(listVariants);

const spacingVariants = variant({
  prop: 'spacing',
  variants: {
    normal: {
      p: [8, , , 16],
    },
    condensed: {
      p: 8,
    },
  },
});

const rowVariants = variant({
  prop: 'variant',
  base: {
    display: 'flex',
    flexDirection: 'row',
  },
  variants: {
    slat: {
      bg: 'background',
      borderBottom: 1,
      '&:last-child': {
        borderBottom: 'none',
      },
    },
    table: {
      bg: 'background',
      '&:nth-child(2n)': {
        bg: 'background-selected',
      },
    },
    bar: {
      border: 1,
      borderRadius: '2px',
      bg: 'background',
    },
  },
});

interface RowProps
  extends StyleProps<typeof rowVariants>,
    StyleProps<typeof spacingVariants> {}

export const RowEl = styled.div<RowProps>(rowVariants, spacingVariants);

const columnSpacing = variant({
  prop: 'spacing',
  base: {
    px: 4,
    pr: { lg: 16 },
  },
  variants: {
    normal: {
      py: { lg: 8 },
      '&:first-child': {
        pl: 8,
      },
      '&:last-child': {
        pr: 0,
      },
    },
    condensed: {
      '&:first-child': {
        pl: 8,
      },
      '&:last-child': {
        pr: 0,
      },
    },
  },
});

const columnSizes = variant({
  prop: 'size',
  base: { minWidth: 0 },
  variants: {
    sm: {
      flexBasis: '6rem',
      maxWidth: '6rem',
    },
    md: {
      flexBasis: '10rem',
      maxWidth: '10rem',
    },
    lg: {
      flexBasis: '12rem',
      maxWidth: '12rem',
    },
    xl: {
      flexBasis: '20rem',
      maxWidth: '20rem',
    },
    content: {
      flexBasis: 'min-content',
      flexShrink: 0,
    },
  },
});

const columnStates = states({
  right: {
    justifyContent: 'flex-end',
  },
  flush: {
    p: 0,
    '&:first-child, &:last-child': {
      p: 0,
    },
  },
  fill: { flexGrow: 1 },
  collapse: { minWidth: 0, flexShrink: 1, flexBasis: 0 },
});

interface ColProps
  extends StyleProps<typeof columnSpacing>,
    StyleProps<typeof columnSizes>,
    StyleProps<typeof columnStates> {}

export const ColEl = styled.div<ColProps>(
  css({
    display: 'flex',
    alignItems: 'center',
  }),
  columnSpacing,
  columnSizes,
  columnStates
);
