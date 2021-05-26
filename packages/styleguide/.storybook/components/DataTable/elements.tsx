import { themed } from '@codecademy/gamut-styles';
import { variant } from '@codecademy/gamut-styles/src';
import { HandlerProps } from '@codecademy/gamut-system';
import styled from '@emotion/styled';

export const Table = styled.div`
  display: grid;
`;

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

export const Row = styled.div<Parameters<typeof rowVariants>[0]>`
  display: flex;
  justify-content: space-between;
  max-width: 100%;
  border-bottom: 1px solid ${themed('colors.navy')};
  ${rowVariants}

  &:last-child {
    border-bottom: none;
  }
`;

type ColSize = HandlerProps<typeof colSizes>;

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

type ColVariants = HandlerProps<typeof colVariants>;

const colVariants = variant({
  variants: {
    header: {
      fontWeight: 'title',
      fontSize: 16,
    },
  },
});

export type ColProps = ColVariants & ColSize;

export const Col = styled.div<ColProps>`
  ${colSizes}
  ${colVariants}
  padding: ${themed('spacing.12')} ${themed('spacing.24')};

  &:first-of-type {
    padding-left: ${themed('spacing.4')};
  }

  &:last-of-type {
    padding-right: ${themed('spacing.4')};
  }
`;
