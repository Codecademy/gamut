import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Radio } from '../Radio';

const onChangeCallback = jest.fn();
const testId = 'my-test-id';

const renderView = setupRtl(Radio, {
  htmlFor: 'some-label',
  checked: true,
  onChange: onChangeCallback,
  value: 'a',
  'data-testid': testId,
});

describe('<Radio>', () => {
  it('sets the input checked state when the prop is passed', () => {
    const { view } = renderView();

    expect(view.getByRole('radio')).toBeChecked();
  });

  it('calls the onChange callback when the input changes', () => {
    const { view } = renderView({
      checked: false,
    });

    userEvent.click(view.getByRole('radio'));

    expect(onChangeCallback).toHaveBeenCalled();
  });

  it('accepts JSX in the label', () => {
    const { view } = renderView({
      label: <img alt="my cat" src="cat.jpg" />,
    });

    view.getByRole('img');
  });

  it('accepts additional props not specified by the component', () => {
    const { view } = renderView();

    view.getByTestId(testId);
  });
});
