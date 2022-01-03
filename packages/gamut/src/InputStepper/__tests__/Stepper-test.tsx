import { setupRtl } from '@codecademy/gamut-tests';

import { InputStepper } from '..';

const renderView = setupRtl(InputStepper, {
  ariaLabel: '',
  label: '',
  onChange: jest.fn(),
  value: 0,
});

describe('InputStepper', () => {
  it('handles initially out of bounds data', () => {
    const { view } = renderView({ min: 2, max: 4, value: 6 });

    expect(view.getByRole('spinbutton')).toHaveValue(4);
  });

  it('handles out of bounds data after a change', () => {
    const { update, view } = renderView({ min: 2, max: 4, value: 3 });

    update({
      value: 1,
    });

    expect(view.getByRole('spinbutton')).toHaveValue(2);
  });

  it('handles a non-specified min as 0', () => {
    const { view } = renderView({ max: 10, value: -1 });

    expect(view.getByRole('spinbutton')).toHaveValue(0);
  });

  it('handles a non-specified max as Infinity', () => {
    const { view } = renderView({ min: 2, value: 8 });

    expect(view.getByRole('spinbutton')).toHaveValue(8);
  });

  it('handles a negative min', () => {
    const { view } = renderView({ min: -2, max: 10, value: -1 });

    expect(view.getByRole('spinbutton')).toHaveValue(-1);
  });

  it('handles a negative max', () => {
    const { view } = renderView({ min: -8, max: -2, value: -1 });

    expect(view.getByRole('spinbutton')).toHaveValue(-2);
  });
});
