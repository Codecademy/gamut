import { getBeakVariant } from '../styles/beak';

describe('getBeakVariant', () => {
  it('uses align for above/below when beak is not center (beak left + align right => below-right)', () => {
    expect(
      getBeakVariant({
        position: 'below',
        align: 'right',
        beak: 'left',
        variant: 'primary',
      })
    ).toBe('below-right');
  });

  it('uses align for above/below when beak is not center (beak right + align left => below-left)', () => {
    expect(
      getBeakVariant({
        position: 'below',
        align: 'left',
        beak: 'right',
        variant: 'primary',
      })
    ).toBe('below-left');
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
    ).toBe('below-right-sml');
  });
});
