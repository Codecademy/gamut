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
      p: { _: 8, sm: 16 },
      gap: { _: 8, sm: 16 },
    },
    condensed: {
      p: 8,
      px: 16,
      gap: 8,
    },
  },
});

const rowVariants = variant({
  prop: 'variant',
  base: {
    display: 'flex',
    flexDirection: { _: 'column', sm: 'row' },
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

const columnArea = variant({
  prop: 'area',
  defaultVariant: 'content',
  variants: {},
});

const columnSizes = variant({
  prop: 'size',
  defaultVariant: 'content',
  base: { flexBasis: 'min-content', minWidth: 0 },
  variants: {
    sm: {
      flexBasis: { sm: '6rem' },
      maxWidth: { sm: '6rem' },
    },
    md: {
      flexBasis: { sm: '10rem' },
      maxWidth: { sm: '10rem' },
    },
    lg: {
      flexBasis: { sm: '12rem' },
      maxWidth: { sm: '12rem' },
    },
    xl: {
      flexBasis: { sm: '20rem' },
      maxWidth: { sm: '20rem' },
    },
    content: {
      flexBasis: { sm: 'min-content' },
      flexShrink: 0,
    },
  },
});

const columnStates = states({
  right: {
    justifyContent: 'flex-end',
  },
  fill: { flexGrow: 1 },
  collapse: {
    minWidth: 0,
    flexShrink: 1,
    flexBasis: 0,
  },
});

interface ColProps
  extends StyleProps<typeof columnSizes>,
    StyleProps<typeof columnStates> {}

export const ColEl = styled.div<ColProps>(
  css({
    display: 'flex',
    alignItems: 'center',
  }),
  columnSizes,
  columnStates
);
