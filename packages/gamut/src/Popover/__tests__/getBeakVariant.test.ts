import { getBeakVariant } from '../styles/beak';

describe('getBeakVariant', () => {
  it("uses `beak` when `position` is not `center` (i.e. `below`) to set the location of the beak relative to the popover' container", () => {
    expect(
      getBeakVariant({
        position: 'below',
        align: 'right',
        beak: 'left',
        variant: 'primary',
      })
    ).toBe('below-left');
  });

  it("uses `beak` when `position` is not `center` (i.e. `above`) to set the location of the beak relative to the popover' container", () => {
    expect(
      getBeakVariant({
        position: 'above',
        align: 'left',
        beak: 'right',
        variant: 'primary',
      })
    ).toBe('above-right');
  });

  it('uses `align` for the beak position when `position` is `above`/`below` when beak is explicitly omitted', () => {
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
