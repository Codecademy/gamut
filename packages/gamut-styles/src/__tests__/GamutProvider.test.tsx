import { setupRtl } from '@codecademy/gamut-tests';
import createCache from '@emotion/cache';
import { ThemeContext } from '@emotion/react';
import { screen } from '@testing-library/react';
import { setNonce } from 'get-nonce';

import { createEmotionCache } from '../cache';
import { GamutProvider, useNonce } from '../GamutProvider';
import { coreTheme as theme } from '../themes';

jest.mock('../cache', () => {
  const cacheMock = jest.fn();
  return { createEmotionCache: cacheMock };
});

jest.mock('get-nonce', () => ({
  setNonce: jest.fn(),
}));

const renderView = setupRtl(GamutProvider, { theme });

describe(GamutProvider, () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (setNonce as jest.Mock).mockClear();
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

    screen.getByText(JSON.stringify(theme));
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

  /**
   * Nonce (CSP) behavior:
   *
   * Unit tests (this file):
   * - GamutProvider calls setNonce(nonce) from get-nonce when the nonce prop is set, so the
   *   get-nonce singleton is updated and libraries like react-style-singleton can use getNonce()
   *   when injecting <style> tags.
   * - createEmotionCache receives { nonce } so Emotion-injected style tags get the nonce attribute.
   * - useNonce() returns the nonce from GamutContext when provided, or undefined otherwise.
   *
   * Manual / integration testing:
   * - Run Storybook with a strict CSP that allows styles only via nonce (e.g. serve with
   *   style-src 'self' 'nonce-storybook-csp-nonce'). Confirm stories render without CSP errors.
   * - In an app: pass nonce={yourCspNonce} to GamutProvider, set the same nonce in your CSP
   *   header, and verify Emotion and motion components (Drawer, FocusTrap, etc.) don’t trigger
   *   CSP violations. Check that injected <style> elements have the nonce attribute.
   */
  it('calls setNonce with the nonce prop', () => {
    renderView({ nonce: 'my-csp-nonce' });

    expect(setNonce).toHaveBeenCalledWith('my-csp-nonce');
  });

  it('useNonce returns the nonce from context when provided', () => {
    const NonceConsumer = () => {
      const nonce = useNonce();
      return <span data-testid="nonce-value">{nonce ?? 'none'}</span>;
    };
    renderView({
      nonce: 'context-nonce',
      children: <NonceConsumer />,
    });

    expect(screen.getByTestId('nonce-value')).toHaveTextContent('context-nonce');
  });

  it('useNonce returns undefined when no nonce is provided', () => {
    const NonceConsumer = () => {
      const nonce = useNonce();
      return <span data-testid="nonce-value">{nonce ?? 'none'}</span>;
    };
    renderView({ children: <NonceConsumer /> });

    expect(screen.getByTestId('nonce-value')).toHaveTextContent('none');
  });

  it('passes nonce to createEmotionCache when provided', () => {
    renderView({ nonce: 'emotion-csp-nonce' });

    expect(createEmotionCache).toHaveBeenCalledWith({
      nonce: 'emotion-csp-nonce',
    });
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
