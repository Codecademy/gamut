import { setupRtl } from '@codecademy/gamut-tests';
import createCache from '@emotion/cache';
import { ThemeContext } from '@emotion/react';
import { screen } from '@testing-library/react';

import { createEmotionCache } from '../cache';
import { GamutProvider } from '../GamutProvider';
import { coreTheme as theme } from '../themes';

jest.mock('../cache', () => {
  const cacheMock = jest.fn();
  return { createEmotionCache: cacheMock };
});

const renderView = setupRtl(GamutProvider, { theme });

describe(GamutProvider, () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders with a cache by default', () => {
    renderView();

    expect(createEmotionCache).toHaveBeenCalled();
  });

  it('does not create a cache when configured not to', () => {
    renderView({ useCache: false });

    expect(createEmotionCache).not.toHaveBeenCalled();
  });
  it('renders global styles', () => {
    renderView();
    const allStyles = Array.from(document.querySelectorAll('style')).filter(
      (el) => Boolean(el.getAttribute('data-emotion'))
    );

    expect(allStyles.length).toBeGreaterThan(0);
  });
  it('does not render global styles when configured', () => {
    renderView({ useGlobals: false });
    const allStyles = Array.from(document.querySelectorAll('style')).filter(
      (el) => Boolean(el.getAttribute('data-emotion'))
    );

    expect(allStyles.length).toBe(0);
  });

  it('wraps all elements in a ThemeProvider', () => {
    renderView({
      children: (
        <ThemeContext.Consumer>
          {(value) => <div>{JSON.stringify(value)}</div>}
        </ThemeContext.Consumer>
      ),
    });

    screen.getByText(JSON.stringify({ ...theme, useLogicalProperties: true }));
  });
  it('it can have another GamutProvider as a child with creating multiple caches or globals', () => {
    renderView({
      useGlobals: false,
      children: <GamutProvider theme={theme} />,
    });

    const allStyles = Array.from(document.querySelectorAll('style')).filter(
      (el) => Boolean(el.getAttribute('data-emotion'))
    );

    expect(createEmotionCache).toHaveBeenCalledTimes(1);
    expect(allStyles.length).toBeGreaterThan(0);
  });

  it('can accept a custom cache', () => {
    renderView({ cache: createCache({ key: 'gamut' }) });

    expect(createEmotionCache).toHaveBeenCalledTimes(0);
  });

  it('can render custom variables', () => {
    renderView({
      variables: { cool: { '--cool': 'blue' } },
    });

    const rootElement = document.documentElement;
    const rootStyles = getComputedStyle(rootElement);
    const blue = rootStyles.getPropertyValue('--cool');

    expect(blue).toBe('blue');
  });
});
