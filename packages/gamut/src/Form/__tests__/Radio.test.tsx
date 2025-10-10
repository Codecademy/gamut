import { setupRtl } from '@codecademy/gamut-tests';
import { act } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { Radio } from '../inputs/Radio';

const onChangeCallback = jest.fn();
const testid = 'my-test-id';

const renderView = setupRtl(Radio, {
  htmlFor: 'some-label',
  checked: true,
  onChange: onChangeCallback,
  value: 'a',
  'data-testid': 'my-test-id',
});

describe('<Radio>', () => {
  it('sets the input checked state when the prop is passed', () => {
    const { view } = renderView();
    view.getByRole('radio', { checked: true });
  });

  it('calls the onChange callback when the input changes', () => {
    const { view } = renderView({ checked: false });

    fireEvent.click(view.getByRole('radio', { checked: false }));

    expect(onChangeCallback).toHaveBeenCalled();
  });

  it('accepts JSX in the label', () => {
    const { view } = renderView({
      label: <img alt="my cat" src="cat.jpg" />,
    });

    view.getByAltText('my cat');
  });

  it('renders an infotip', async () => {
    const info = 'small info';
    const { view } = renderView({
      label: 'label',
      infotip: { info: 'small info' },
    });
    const tip = view.getByText(info);

    expect(tip).not.toBeVisible();

    await act(async () => {
      await userEvent.click(view.getByRole('button'));
    });

    expect(tip).toBeVisible();
  });

  it('accepts additional props not specified by the component', () => {
    const { view } = renderView();

    expect(view.getByRole('radio', { checked: true })).toHaveAttribute(
      'data-testid',
      testid
    );
  });
});
