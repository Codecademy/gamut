import { setupRtl } from '@codecademy/gamut-tests';
import { userEvent } from '@testing-library/user-event';

import { InputStepper } from '..';
import { ControlledStepperTest } from '../__fixtures__/helpers';

const defaultProps = {
  label: 'input stepper',
  ariaLabel: 'input-stepper',
  onChange: () => null,
};

const renderView = setupRtl(InputStepper, defaultProps);

const renderWrappedView = setupRtl(ControlledStepperTest, defaultProps);

const getRoleAndTestValue = ({
  view,
  value,
}: {
  view: ReturnType<typeof renderView>['view'];
  value: number;
}) => {
  const field = view.getByRole('spinbutton');
  expect(field).toHaveValue(value);
};
describe('InputStepper', () => {
  it('handles initially out of bounds data', () => {
    const { view } = renderView({ min: 2, max: 4, value: 6 });
    getRoleAndTestValue({ view, value: 4 });
  });

  it('handles out of bounds data after a change', async () => {
    const { view } = renderWrappedView({ min: 2, max: 4, value: 3 });

    const downButton = view.getByRole('button', {
      name: 'input-stepper current value of 3 subtract one',
    });
    const upButton = view.getByRole('button', {
      name: 'input-stepper current value of 3 add one',
    });
    const field = view.getByRole('spinbutton');

    await userEvent.click(downButton);
    expect(field).toHaveValue(2);

    await userEvent.click(upButton);
    expect(field).toHaveValue(3);
  });

  it('handles a non-specified min', () => {
    const { view } = renderView({ max: 10, value: -1 });
    getRoleAndTestValue({ view, value: 0 });
  });

  it('handles a non-specified max', () => {
    const { view } = renderView({ min: 2, value: 8 });
    getRoleAndTestValue({ view, value: 8 });
  });

  it('handles a negative min', () => {
    const { view } = renderView({ min: -2, max: 10, value: -1 });
    getRoleAndTestValue({ view, value: -1 });
  });

  it('handles a negative max', () => {
    const { view } = renderView({ min: -8, max: -2, value: -1 });
    getRoleAndTestValue({ view, value: -2 });
  });
});
