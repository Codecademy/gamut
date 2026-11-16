import {
  coreTheme,
  GamutProvider,
  lxStudioTheme,
  percipioTheme,
  theme,
} from '@codecademy/gamut-styles';
import { MockGamutProvider, setupRtl } from '@codecademy/gamut-tests';
import { renderHook } from '@testing-library/react';

import { Card } from '..';
import { useCardElevation } from '../styles';

const renderView = setupRtl(Card, { children: 'Card content' });

const renderElevation = (...args: Parameters<typeof useCardElevation>) =>
  renderHook(() => useCardElevation(...args), {
    wrapper: MockGamutProvider,
  }).result.current;

describe('Card', () => {
  it('renders its children', () => {
    const { view } = renderView();

    expect(view.getByText('Card content')).toBeInTheDocument();
  });

  it.each(['patternLeft', 'patternRight', 'outline'] as const)(
    'renders children when interactive with the %s shadow',
    (shadow) => {
      const { view } = renderView({ isInteractive: true, shadow });

      expect(view.getByText('Card content')).toBeInTheDocument();
    }
  );

  it('renders children for non-default variants', () => {
    const { view } = renderView({ variant: 'white' });

    expect(view.getByText('Card content')).toBeInTheDocument();
  });
});

describe('useCardElevation', () => {
  it('maps the theme elevation tokens onto the motion variants', () => {
    const { animate, initial } = renderElevation('none', 'md');

    expect(initial).toMatchObject({
      boxShadow: theme.elevation['rest-shadow'],
      transform: theme.elevation['rest-transform'],
    });
    expect(animate).toMatchObject({
      boxShadow: theme.elevation['hover-shadow'],
      transform: theme.elevation['hover-transform'],
    });
  });

  it('uses the mirrored hover tokens for patternRight shadows', () => {
    const { animate } = renderElevation('patternRight', 'md');

    expect(animate).toMatchObject({
      boxShadow: theme.elevation['hoverMirrored-shadow'],
      transform: theme.elevation['hoverMirrored-transform'],
    });
  });

  it('applies outline shadows but shares the elevation transforms', () => {
    const { animateOutline, initialOutline } = renderElevation('outline', 'md');

    expect(initialOutline.boxShadow).not.toBe(theme.elevation['rest-shadow']);
    expect(initialOutline.transform).toBe(theme.elevation['rest-transform']);
    expect(animateOutline.boxShadow).not.toBe(theme.elevation['hover-shadow']);
    expect(animateOutline.transform).toBe(theme.elevation['hover-transform']);
  });

  it('passes borderRadius through to every variant', () => {
    const variants = renderElevation('none', 'lg');

    Object.values(variants).forEach((variant) => {
      expect(variant.borderRadius).toBe(theme.borderRadii.lg);
    });
  });

  it.each([
    ['coreTheme', coreTheme],
    ['percipioTheme', percipioTheme],
    ['lxStudioTheme', lxStudioTheme],
  ])('resolves borderRadius from %s', (_name, activeTheme) => {
    (['sm', 'md', 'lg'] as const).forEach((token) => {
      const { result } = renderHook(() => useCardElevation('none', token), {
        wrapper: ({ children }) => (
          <GamutProvider
            theme={activeTheme}
            useCache={false}
            useGlobals={false}
          >
            {children}
          </GamutProvider>
        ),
      });

      expect(result.current.initial.borderRadius).toBe(
        activeTheme.borderRadii[token]
      );
    });
  });
});
