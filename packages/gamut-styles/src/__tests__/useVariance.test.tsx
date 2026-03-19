import { matchers } from '@emotion/jest';
import { CacheProvider } from '@emotion/react';
import { renderHook } from '@testing-library/react';
import createCache from '@emotion/cache';
import * as React from 'react';

import { system } from '..';
import { coreTheme as theme } from '../themes';
import { GamutProvider } from '../GamutProvider';
import { useVariance } from '../variance/useVariance';

expect.extend(matchers);

// A real cache is needed so that __unsafe_useEmotionCache returns a non-null value.
const testCache = createCache({ key: 'test' });

const wrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <GamutProvider theme={theme} useCache={false} useGlobals={false}>
    <CacheProvider value={testCache}>{children}</CacheProvider>
  </GamutProvider>
);

// system.space uses shorthand props: p, m, px, py, etc.
const spaceParser = system.space;
// system.layout uses props: width, height, etc.
const layoutParser = system.layout;

describe('useVariance', () => {
  it('removes system props from rest', () => {
    const { result } = renderHook(
      () =>
        useVariance(
          // m and p are system prop names in spaceParser
          { m: 4, p: 8, id: 'box', 'data-testid': 'box' },
          spaceParser
        ),
      { wrapper }
    );

    expect(result.current.rest).not.toHaveProperty('m');
    expect(result.current.rest).not.toHaveProperty('p');
    expect(result.current.rest).toHaveProperty('id', 'box');
    expect(result.current.rest).toHaveProperty('data-testid', 'box');
  });

  it('removes non-HTML props from rest', () => {
    const { result } = renderHook(
      () =>
        useVariance(
          { someCustomProp: 'value', onClick: jest.fn(), id: 'element' },
          spaceParser
        ),
      { wrapper }
    );

    expect(result.current.rest).not.toHaveProperty('someCustomProp');
    expect(result.current.rest).toHaveProperty('onClick');
    expect(result.current.rest).toHaveProperty('id', 'element');
  });

  it('generates a className when styles are applied', () => {
    // p is the shorthand for padding in system.space
    const { result } = renderHook(
      () => useVariance({ p: 16 }, spaceParser),
      { wrapper }
    );

    expect(result.current.className).toBeTruthy();
    expect(typeof result.current.className).toBe('string');
  });

  it('returns an empty string className when no styles are applied', () => {
    const { result } = renderHook(
      () => useVariance({ id: 'box' }, spaceParser),
      { wrapper }
    );

    // No system props provided → no generated styles, but no error either.
    expect(result.current.className).toBe('');
  });

  it('merges an incoming className with the generated one', () => {
    const { result } = renderHook(
      () =>
        // p is the shorthand for padding in system.space
        useVariance({ className: 'my-class', p: 8 }, spaceParser),
      { wrapper }
    );

    expect(result.current.className).toContain('my-class');
    // Also contains the generated emotion class name.
    expect(result.current.className.split(' ').length).toBeGreaterThan(1);
  });

  it('passes through the incoming className when no styles are generated', () => {
    const { result } = renderHook(
      () => useVariance({ className: 'existing-class' }, spaceParser),
      { wrapper }
    );

    expect(result.current.className).toBe('existing-class');
  });

  it('does not include theme in rest', () => {
    const { result } = renderHook(
      () => useVariance({ theme } as Record<string, unknown>, spaceParser),
      { wrapper }
    );

    expect(result.current.rest).not.toHaveProperty('theme');
  });

  it('includes merged className in rest', () => {
    const { result } = renderHook(
      () =>
        // p is the shorthand for padding in system.space
        useVariance(
          { className: 'original', p: 8 },
          spaceParser
        ),
      { wrapper }
    );

    // className in rest should be the MERGED className (original + generated)
    expect(result.current.rest.className).toContain('original');
  });

  it('handles multiple parsers', () => {
    const { result } = renderHook(
      () =>
        useVariance(
          // p: shorthand for padding, width: direct system.layout prop
          { p: 8, width: 1, id: 'multi' },
          spaceParser,
          layoutParser
        ),
      { wrapper }
    );

    expect(result.current.rest).not.toHaveProperty('p');
    expect(result.current.rest).not.toHaveProperty('width');
    expect(result.current.rest).toHaveProperty('id', 'multi');
    expect(result.current.className).toBeTruthy();
  });

  it('handles style functions without propNames (e.g. from states())', () => {
    const statesParser = system.states({
      fit: { width: 1, height: 1 },
    });

    // fit is not a valid HTML attribute so isPropValid will exclude it,
    // even though statesParser doesn't have propNames.
    const { result } = renderHook(
      () => useVariance({ fit: true } as Record<string, unknown>, statesParser),
      { wrapper }
    );

    expect(result.current.rest).not.toHaveProperty('fit');
    expect(result.current.className).toBeTruthy();
  });

  it('returns the className in rest for convenience when spreading onto elements', () => {
    const { result } = renderHook(
      () => useVariance({ p: 8, id: 'elem' }, spaceParser),
      { wrapper }
    );

    expect(result.current.rest).toHaveProperty('className');
    expect(result.current.rest.className).toBe(result.current.className);
  });
});
