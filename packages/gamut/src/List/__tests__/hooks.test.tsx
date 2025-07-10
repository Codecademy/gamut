import { renderHook } from '@testing-library/react';

import { useResponsiveSpacing } from '../hooks';

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
