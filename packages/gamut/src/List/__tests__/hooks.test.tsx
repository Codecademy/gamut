import { renderHook } from '@testing-library/react';

import {
  useColSize,
  useResponsiveColumn,
  useResponsiveSpacing,
} from '../hooks';

describe('useResponsiveSpacing', () => {
  it('returns spacing when compact or xs breakpoint', () => {
    const { result } = renderHook(() =>
      useResponsiveSpacing({ rowBreakpoint: 'xs', spacing: 'normal' })
    );
    expect(result.current).toBe('normal');

    const { result: result2 } = renderHook(() =>
      useResponsiveSpacing({ rowBreakpoint: 'md', spacing: 'compact' })
    );
    expect(result2.current).toBe('compact');
  });

  it('returns responsive spacing when breakpoint and spacing are provided', () => {
    const { result } = renderHook(() =>
      useResponsiveSpacing({ rowBreakpoint: 'md', spacing: 'condensed' })
    );
    expect(result.current).toBe('md_condensed');
  });

  it('returns normal when no spacing provided', () => {
    const { result } = renderHook(() =>
      useResponsiveSpacing({ rowBreakpoint: 'xs', spacing: undefined })
    );
    expect(result.current).toBe('normal');
  });
});

describe('useResponsiveColumn', () => {
  it('returns columnType when not control or xs breakpoint', () => {
    const { result } = renderHook(() =>
      useResponsiveColumn({ rowBreakpoint: 'xs', columnType: 'content' })
    );
    expect(result.current).toBe('content');

    const { result: result2 } = renderHook(() =>
      useResponsiveColumn({ rowBreakpoint: 'md', columnType: 'header' })
    );
    expect(result2.current).toBe('header');
  });

  it('returns responsive control when breakpoint and columnType is control', () => {
    const { result } = renderHook(() =>
      useResponsiveColumn({ rowBreakpoint: 'sm', columnType: 'control' })
    );
    expect(result.current).toBe('sm_control');

    const { result: result2 } = renderHook(() =>
      useResponsiveColumn({ rowBreakpoint: 'md', columnType: 'control' })
    );
    expect(result2.current).toBe('md_control');
  });

  it('returns undefined when no columnType provided', () => {
    const { result } = renderHook(() =>
      useResponsiveColumn({ rowBreakpoint: 'md', columnType: undefined })
    );
    expect(result.current).toBe(undefined);
  });
});

describe('useColSize', () => {
  it('returns empty object when no colSize provided', () => {
    const { result } = renderHook(() =>
      useColSize({ rowBreakpoint: 'md', colSize: undefined })
    );
    expect(result.current).toEqual({ px: { _: 16, c_md: 0 } });
  });

  it('returns correct width and flexBasis for sm colSize without breakpoint', () => {
    const { result } = renderHook(() =>
      useColSize({ rowBreakpoint: 'xs', colSize: 'sm' })
    );
    expect(result.current).toEqual({
      px: { _: 16, c_xs: 0 },
      flexBasis: { c_xs: '6rem' },
      width: '6rem',
    });
  });

  it('returns correct width and flexBasis for md colSize without breakpoint', () => {
    const { result } = renderHook(() =>
      useColSize({ rowBreakpoint: 'xs', colSize: 'md' })
    );
    expect(result.current).toEqual({
      px: { _: 16, c_xs: 0 },
      flexBasis: { c_xs: '10rem' },
      width: '10rem',
    });
  });

  it('returns correct width and flexBasis for lg colSize without breakpoint', () => {
    const { result } = renderHook(() =>
      useColSize({ rowBreakpoint: 'xs', colSize: 'lg' })
    );
    expect(result.current).toEqual({
      px: { _: 16, c_xs: 0 },
      flexBasis: { c_xs: '12rem' },
      width: '12rem',
    });
  });

  it('returns correct width and flexBasis for xl colSize without breakpoint', () => {
    const { result } = renderHook(() =>
      useColSize({ rowBreakpoint: 'xs', colSize: 'xl' })
    );
    expect(result.current).toEqual({
      px: { _: 16, c_xs: 0 },
      flexBasis: { c_xs: '20rem' },
      width: '20rem',
    });
  });

  it('returns correct width and responsive flexBasis for sm colSize with sm breakpoint', () => {
    const { result } = renderHook(() =>
      useColSize({ rowBreakpoint: 'sm', colSize: 'sm' })
    );
    expect(result.current).toEqual({
      px: { _: 16, c_sm: 0 },
      flexBasis: { c_sm: '6rem' },
      width: '6rem',
    });
  });

  it('returns correct width and responsive flexBasis for md colSize with md breakpoint', () => {
    const { result } = renderHook(() =>
      useColSize({ rowBreakpoint: 'md', colSize: 'md' })
    );
    expect(result.current).toEqual({
      px: { _: 16, c_md: 0 },
      flexBasis: { c_md: '10rem' },
      width: '10rem',
    });
  });

  it('returns correct width and responsive flexBasis for different colSize and breakpoint combinations', () => {
    const { result } = renderHook(() =>
      useColSize({ rowBreakpoint: 'md', colSize: 'lg' })
    );
    expect(result.current).toEqual({
      px: { _: 16, c_md: 0 },
      flexBasis: { c_md: '12rem' },
      width: '12rem',
    });
  });

  it('returns correct width and responsive flexBasis for xl colSize with sm breakpoint', () => {
    const { result } = renderHook(() =>
      useColSize({ rowBreakpoint: 'sm', colSize: 'xl' })
    );
    expect(result.current).toEqual({
      px: { _: 16, c_sm: 0 },
      flexBasis: { c_sm: '20rem' },
      width: '20rem',
    });
  });

  it('includes spacing when provided', () => {
    const { result } = renderHook(() =>
      useColSize({ rowBreakpoint: 'md', colSize: 'sm', spacing: 'normal' })
    );
    expect(result.current).toEqual({
      px: { _: 16, c_md: 0 },
      flexBasis: { c_md: '6rem' },
      width: '6rem',
      py: { _: 0, c_md: 16 },
    });
  });

  it('includes condensed spacing when provided', () => {
    const { result } = renderHook(() =>
      useColSize({ rowBreakpoint: 'md', colSize: 'sm', spacing: 'condensed' })
    );
    expect(result.current).toEqual({
      px: { _: 16, c_md: 0 },
      flexBasis: { c_md: '6rem' },
      width: '6rem',
      py: { _: 0, c_md: 8 },
    });
  });

  it('does not include py when spacing is compact', () => {
    const { result } = renderHook(() =>
      useColSize({ rowBreakpoint: 'md', colSize: 'sm', spacing: 'compact' })
    );
    expect(result.current).toEqual({
      px: { _: 16, c_md: 0 },
      flexBasis: { c_md: '6rem' },
      width: '6rem',
    });
  });
});
