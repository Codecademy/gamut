import { getBeakVariant } from '../styles/beak';

describe('getBeakVariant', () => {
  it('pins corner beak for above/below when beak is left or right (overrides align)', () => {
    expect(
      getBeakVariant({
        position: 'below',
        align: 'right',
        beak: 'left',
        variant: 'primary',
      })
    ).toBe('below-left');
  });

  it('pins the opposite corner when beak is right and align is left', () => {
    expect(
      getBeakVariant({
        position: 'below',
        align: 'left',
        beak: 'right',
        variant: 'primary',
      })
    ).toBe('below-right');
  });

  it('falls back to align for above/below when beak is omitted', () => {
    expect(
      getBeakVariant({
        position: 'above',
        align: 'right',
        variant: 'secondary',
      })
    ).toBe('above-right-sml');
  });

  it('uses center beak when beak is center regardless of align', () => {
    expect(
      getBeakVariant({
        position: 'below',
        align: 'right',
        beak: 'center',
        variant: 'primary',
      })
    ).toBe('below-center');
  });

  it('uses align for position center', () => {
    expect(
      getBeakVariant({
        position: 'center',
        align: 'left',
        beak: 'center',
        variant: 'secondary',
      })
    ).toBe('center-left-sml');
  });

  it('appends -sml for secondary variant', () => {
    expect(
      getBeakVariant({
        position: 'below',
        align: 'right',
        beak: 'left',
        variant: 'secondary',
      })
    ).toBe('below-left-sml');
  });
});
