import { system, variant } from '@codecademy/gamut-styles/src';
import styled from '@emotion/styled';
import { StyleProps } from '@codecademy/variance';
import { Box } from '@codecademy/gamut';

export const Table = styled(Box)(
  system.css({ borderRadius: 'lg', p: 8, display: 'grid', mb: 32 })
);

const rowVariants = variant({
  variants: {
    inset: {
      border: 1,
      borderTop: 'none',
      borderColor: 'gray-200',
      bg: 'gray-100',
      p: 32,
    },
  },
});

interface RowProps extends StyleProps<typeof rowVariants> {}

export const Row = styled.div<RowProps>(
  system.css({
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: 1,
    borderBottom: 1,
    '&:last-child': {
      borderBottom: 'none',
    },
  }),
  rowVariants
);

const colSizes = variant({
  prop: 'size',
  variants: {
    sm: {
      flexBasis: '4rem',
      maxWidth: '4rem',
    },
    md: {
      flexBasis: '8rem',
      maxWidth: '8rem',
    },
    lg: {
      flexBasis: '12rem',
      maxWidth: '12rem',
    },
    xl: {
      flexBasis: '20rem',
      maxWidth: '20rem',
    },
    fill: {
      flex: 1,
    },
  },
});

const colVariants = variant({
  variants: {
    header: {
      fontWeight: 'title',
      fontSize: 16,
    },
  },
});

export interface ColProps
  extends StyleProps<typeof colVariants>,
    StyleProps<typeof colSizes> {}

export const Col = styled.div<ColProps>(
  system.css({
    py: 12,
    px: 24,
    '&:first-of-type': { pl: 4 },
    '&:last-of-type': { pr: 4 },
  }),
  colSizes,
  colVariants
);
