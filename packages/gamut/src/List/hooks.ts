import { useMemo } from 'react';

import { ResponsiveColumnTypes } from './elements';

/**
 * Hook that calculates responsive spacing based on rowBreakpoint and spacing props.
 * Returns the appropriate spacing value for the current breakpoint.
 */
export const useResponsiveSpacing = (
  rowBreakpoint?: 'xs' | 'sm' | 'md',
  spacing?: 'normal' | 'condensed' | 'compact'
) => {
  return useMemo(() => {
    if (spacing === 'compact' || rowBreakpoint === 'xs') {
      return spacing;
    }
    if (rowBreakpoint && spacing) {
      return `${rowBreakpoint}_${spacing}` as const;
    }
    return 'normal';
  }, [rowBreakpoint, spacing]);
};

/**
 * Hook that calculates responsive columnType based on rowBreakpoint and columnType props.
 * Returns the appropriate columnType value for the current breakpoint.
 */
export const useResponsiveColumn = (
  rowBreakpoint?: 'xs' | 'sm' | 'md',
  columnType?: ResponsiveColumnTypes['type']
) => {
  return useMemo(() => {
    if (columnType !== 'control' || rowBreakpoint === 'xs') {
      return columnType;
    }
    if (rowBreakpoint && columnType === 'control') {
      return `${rowBreakpoint}_${columnType}`;
    }
    return 'content';
  }, [rowBreakpoint, columnType]);
};

const colSizes = {
  sm: '6rem',
  md: '10rem',
  lg: '12rem',
  xl: '20rem',
} as const;

/**
 * Hook that calculates responsive columnType based on rowBreakpoint and columnType props.
 * Returns the appropriate columnType value for the current breakpoint.
 */
export const useColSize = (
  rowBreakpoint?: 'sm' | 'md' | 'lg' | 'xl',
  colSize?: 'sm' | 'md' | 'lg' | 'xl' | 'content'
) => {
  return useMemo(() => {
    if (!colSize) {
      return {};
    }
    if (colSize === 'content') {
      return { flexShrink: 0 };
    }

    if (colSize) {
      const columnSize = colSizes[colSize];
      const baseStyleObj = { width: columnSize };

      if (!rowBreakpoint) {
        return { flexBasis: { c_xs: columnSize }, ...baseStyleObj };
      }
      return {
        flexBasis: { [`c_${rowBreakpoint}`]: columnSize },
        ...baseStyleObj,
      };
    }
  }, [rowBreakpoint, colSize]);
};
