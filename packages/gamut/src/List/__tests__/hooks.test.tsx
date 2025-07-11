import { renderHook } from '@testing-library/react';

import {
  useColSize,
  useResponsiveColumn,
  useResponsiveSpacing,
} from '../hooks';

describe('useResponsiveSpacing', () => {
  it('returns spacing when compact or xs breakpoint', () => {
    const { result } = renderHook(() => useResponsiveSpacing('xs', 'normal'));
    expect(result.current).toBe('normal');

    const { result: result2 } = renderHook(() =>
      useResponsiveSpacing('md', 'compact')
    );
    expect(result2.current).toBe('compact');
  });

  it('returns responsive spacing when breakpoint and spacing are provided', () => {
    const { result } = renderHook(() =>
      useResponsiveSpacing('md', 'condensed')
    );
    expect(result.current).toBe('md_condensed');
  });

  it('returns normal when no breakpoint or spacing', () => {
    const { result } = renderHook(() =>
      useResponsiveSpacing(undefined, undefined)
    );
    expect(result.current).toBe('normal');
  });
});

describe('useResponsiveColumn', () => {
  it('returns columnType when not control or xs breakpoint', () => {
    const { result } = renderHook(() => useResponsiveColumn('xs', 'content'));
    expect(result.current).toBe('content');

    const { result: result2 } = renderHook(() =>
      useResponsiveColumn('md', 'header')
    );
    expect(result2.current).toBe('header');
  });

  it('returns responsive control when breakpoint and columnType is control', () => {
    const { result } = renderHook(() => useResponsiveColumn('sm', 'control'));
    expect(result.current).toBe('sm_control');

    const { result: result2 } = renderHook(() =>
      useResponsiveColumn('md', 'control')
    );
    expect(result2.current).toBe('md_control');
  });

  it('returns undefined when no columnType provided', () => {
    const { result } = renderHook(() => useResponsiveColumn('md', undefined));
    expect(result.current).toBe(undefined);
  });
});

describe('useColSize', () => {
  it('returns empty object when no colSize provided', () => {
    const { result } = renderHook(() => useColSize('md', undefined));
    expect(result.current).toEqual({});
  });

  it('returns flexShrink 0 for content colSize', () => {
    const { result } = renderHook(() => useColSize('md', 'content'));
    expect(result.current).toEqual({ flexShrink: 0 });
  });

  it('returns correct width and flexBasis for sm colSize without breakpoint', () => {
    const { result } = renderHook(() => useColSize(undefined, 'sm'));
    expect(result.current).toEqual({
      flexBasis: { c_xs: '6rem' },
      width: '6rem',
    });
  });

  it('returns correct width and flexBasis for md colSize without breakpoint', () => {
    const { result } = renderHook(() => useColSize(undefined, 'md'));
    expect(result.current).toEqual({
      flexBasis: { c_xs: '10rem' },
      width: '10rem',
    });
  });

  it('returns correct width and flexBasis for lg colSize without breakpoint', () => {
    const { result } = renderHook(() => useColSize(undefined, 'lg'));
    expect(result.current).toEqual({
      flexBasis: { c_xs: '12rem' },
      width: '12rem',
    });
  });

  it('returns correct width and flexBasis for xl colSize without breakpoint', () => {
    const { result } = renderHook(() => useColSize(undefined, 'xl'));
    expect(result.current).toEqual({
      flexBasis: { c_xs: '20rem' },
      width: '20rem',
    });
  });

  it('returns correct width and responsive flexBasis for sm colSize with sm breakpoint', () => {
    const { result } = renderHook(() => useColSize('sm', 'sm'));
    expect(result.current).toEqual({
      flexBasis: { c_sm: '6rem' },
      width: '6rem',
    });
  });

  it('returns correct width and responsive flexBasis for md colSize with md breakpoint', () => {
    const { result } = renderHook(() => useColSize('md', 'md'));
    expect(result.current).toEqual({
      flexBasis: { c_md: '10rem' },
      width: '10rem',
    });
  });

  it('returns correct width and responsive flexBasis for lg colSize with lg breakpoint', () => {
    const { result } = renderHook(() => useColSize('lg', 'lg'));
    expect(result.current).toEqual({
      flexBasis: { c_lg: '12rem' },
      width: '12rem',
    });
  });

  it('returns correct width and responsive flexBasis for xl colSize with xl breakpoint', () => {
    const { result } = renderHook(() => useColSize('xl', 'xl'));
    expect(result.current).toEqual({
      flexBasis: { c_xl: '20rem' },
      width: '20rem',
    });
  });

  it('returns correct width and responsive flexBasis for different colSize and breakpoint combinations', () => {
    const { result } = renderHook(() => useColSize('md', 'lg'));
    expect(result.current).toEqual({
      flexBasis: { c_md: '12rem' },
      width: '12rem',
    });
  });

  it('returns correct width and responsive flexBasis for xl colSize with sm breakpoint', () => {
    const { result } = renderHook(() => useColSize('sm', 'xl'));
    expect(result.current).toEqual({
      flexBasis: { c_sm: '20rem' },
      width: '20rem',
    });
  });
});
