import { theme } from '@codecademy/gamut-styles';
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
    const { animate, initial } = renderElevation('none');

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
    const { animate } = renderElevation('patternRight');

    expect(animate).toMatchObject({
      boxShadow: theme.elevation['hoverMirrored-shadow'],
      transform: theme.elevation['hoverMirrored-transform'],
    });
  });

  it('applies outline shadows but shares the elevation transforms', () => {
    const { animateOutline, initialOutline } = renderElevation('outline');

    expect(initialOutline.boxShadow).not.toBe(theme.elevation['rest-shadow']);
    expect(initialOutline.transform).toBe(theme.elevation['rest-transform']);
    expect(animateOutline.boxShadow).not.toBe(theme.elevation['hover-shadow']);
    expect(animateOutline.transform).toBe(theme.elevation['hover-transform']);
  });

  it('passes borderRadius through to every variant', () => {
    const variants = renderElevation('none', '8px');

    Object.values(variants).forEach((variant) => {
      expect(variant.borderRadius).toBe('8px');
    });
  });
});
