import { css, states, variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';

const listVariants = variant({
  prop: 'variant',
  defaultVariant: 'slat',
  base: {
    listStyleType: 'none',
    p: 0,
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

const listStates = states({
  scrollable: {
    overflowX: 'auto',
    maxWidth: 1,
  },
});

export interface ListProps
  extends StyleProps<typeof listStates>,
    StyleProps<typeof listVariants> {}

export const ListEl = styled.ul<ListProps>(listVariants, listStates);

const rowStates = states({
  scrollable: {
    minWidth: 'min-content',
    width: '100%',
  },
});

const spacingVariants = variant({
  prop: 'spacing',
  variants: {
    normal: {
      gap: { _: 8, xs: 16 },
    },
    condensed: {
      fontSize: 14,
      gap: 8,
    },
  },
});

const rowVariants = variant({
  prop: 'variant',
  base: {
    py: { _: 8, xs: 0 },
    display: { _: 'grid', xs: 'flex' },
    gridAutoRows: 'minmax(1.5rem, max-content)',
    gridTemplateColumns: 'minmax(0, 1fr) max-content',
    flexDirection: { _: 'column', xs: 'row' },
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

export interface RowProps
  extends StyleProps<typeof rowVariants>,
    StyleProps<typeof spacingVariants> {}

export const RowEl = styled.li<RowProps>(
  rowVariants,
  spacingVariants,
  rowStates
);

const columnType = variant({
  prop: 'type',
  defaultVariant: 'content',
  variants: {
    header: {
      gridColumn: 1,
    },
    content: {
      gridColumnEnd: 'span 2',
    },
    control: {
      minWidth: 'min-content',
      alignItems: {
        _: 'flex-start',
        xs: 'center',
      },
      gridColumn: 2,
      gridRow: 1,
    },
  },
});

const columnJustify = variant({
  prop: 'justify',
  defaultVariant: 'left',
  variants: {
    left: {
      justifyContent: { xs: 'flex-start' },
    },
    right: {
      justifyContent: { xs: 'flex-end' },
    },
  },
});

const columnSizes = variant({
  prop: 'size',
  defaultVariant: 'content',
  base: { minWidth: 0, maxWidth: 1, flexShrink: 1 },
  variants: {
    sm: {
      flexBasis: { xs: '6rem' },
      width: { xs: '6rem' },
    },
    md: {
      flexBasis: { xs: '10rem' },
      width: { xs: '10rem' },
    },
    lg: {
      flexBasis: { xs: '12rem' },
      width: { xs: '12rem' },
    },
    xl: {
      flexBasis: { xs: '20rem' },
      width: { xs: '20rem' },
    },
    content: {
      flexShrink: 0,
    },
  },
});

const columnStates = states({
  fill: { flexGrow: { xs: 1 } },
  sticky: {
    position: 'sticky',
    left: 0,
    bg: 'inherit',
  },
});

const columnSpacing = variant({
  prop: 'spacing',
  base: {
    px: { _: 16, xs: 0 },
    '&:first-of-type': {
      pl: 16,
    },
    '&:last-of-type': {
      pr: 16,
    },
  },
  variants: {
    normal: {
      py: { _: 0, xs: 16 },
    },
    condensed: {
      py: { _: 0, xs: 8 },
    },
  },
});

export interface ColProps
  extends StyleProps<typeof columnSizes>,
    StyleProps<typeof columnType>,
    StyleProps<typeof columnStates>,
    StyleProps<typeof columnJustify> {}

export const ColEl = styled.div<ColProps>(
  css({
    display: 'inline-flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    position: 'relative',
  }),
  columnSpacing,
  columnSizes,
  columnType,
  columnStates,
  columnJustify
);
