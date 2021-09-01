import { css, states, variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { forwardRef, useContext, useMemo } from 'react';

import { Text } from '../Typography';

export interface ListProps {
  spacing: 'normal' | 'condensed';
  variant: 'slat' | 'table';
}

export interface ListContextProps extends ListProps {
  depth: number;
}

export const ListContext = React.createContext<ListContextProps>(
  {} as ListContextProps
);

ListContext.displayName = 'ListContext';

export const ListProvider = ListContext.Provider;

export function useListContext() {
  const context = useContext(ListContext);
  return context;
}

export function useList({ spacing, variant }: Omit<ListContextProps, 'depth'>) {
  const {
    depth = 0,
    variant: activeVariant = variant,
    spacing: activeSpacing = spacing,
  } = useListContext();

  return useMemo(
    () => ({
      root: depth === 0,
      variant: activeVariant,
      spacing: activeSpacing,
      depth: depth + 1,
    }),
    [activeVariant, activeSpacing, depth]
  );
}

export const List = forwardRef<HTMLDivElement, ListContextProps>(
  ({ variant = 'slat', spacing = 'normal', children }, ref) => {
    const value = useList({ variant, spacing });
    return (
      <ListProvider value={value}>
        <ListEl ref={ref} variant={value.variant}>
          {children}
        </ListEl>
      </ListProvider>
    );
  }
);

export const ListRow = forwardRef<HTMLDivElement, ListContextProps>(
  ({ children }, ref) => {
    const activeVariants = useListContext();
    return (
      <RowEl {...activeVariants} ref={ref}>
        {children}
      </RowEl>
    );
  }
);

export const ListCol = forwardRef<HTMLDivElement, ListContextProps>(
  ({ children, ...props }, ref) => {
    const activeVariants = useListContext();
    const content =
      typeof children === 'string' ? (
        <Text truncate="ellipsis">{children}</Text>
      ) : (
        children
      );

    return (
      <ColEl {...activeVariants} {...props}>
        {content}
      </ColEl>
    );
  }
);

const ListEl = styled.div(
  variant({
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
      table: {
        gap: 16,
      },
    },
  })
);

const RowEl = styled.div(
  variant({
    prop: 'spacing',
    variants: {
      normal: {
        p: [8, , , 16],
      },
      condensed: {
        p: 8,
      },
    },
  }),
  variant({
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
        '&:nth-child(2n)': {
          bg: 'background-selected',
        },
      },
    },
  })
);

const ColEl = styled.div(
  css({
    display: 'flex',
    alignItems: 'center',
  }),
  variant({
    prop: 'spacing',
    base: {
      px: 4,
    },
    variants: {
      normal: {
        py: [4, , , 8],
        pr: [8, , , 16],
        '&:first-child': {
          pl: 8,
        },
        '&:last-child': {
          pr: 0,
        },
      },
      condensed: {
        pr: [8, , , 16],
        '&:first-child': {
          pl: 8,
        },
        '&:last-child': {
          pr: 0,
        },
      },
    },
  }),
  variant({
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
  }),
  states({
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
  })
);
