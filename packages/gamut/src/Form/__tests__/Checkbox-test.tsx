import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Checkbox } from '../Checkbox';

const onChange = jest.fn();

const renderView = setupRtl(Checkbox, {
  htmlFor: 'some-label',
  label: 'Some label',
  onChange,
});

describe('<Checkbox>', () => {
  it('sets the input checked state when the prop is passed', () => {
    const { view } = renderView({ checked: true });

    expect(view.getByRole('checkbox')).toBeChecked();
  });

  it('calls the onChange callback when the input changes', () => {
    const onChange = jest.fn();

    const { view } = renderView({ onChange });

    userEvent.click(view.getByRole('checkbox'));

    expect(onChange).toHaveBeenCalled();
  });

  it('accepts JSX in the label', () => {
    const { view } = renderView({
      label: <img alt="my cat" src="cat.jpg" />,
    });

    view.getByRole('img', { hidden: true });
  });

  it('accepts an aria-label', () => {
    const { view } = renderView({
      'aria-label': 'i am a labeled checkbox',
    });

    view.getByLabelText('i am a labeled checkbox');
  });
});
