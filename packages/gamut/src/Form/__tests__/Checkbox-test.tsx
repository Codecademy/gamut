import { setupEnzyme } from '@codecademy/gamut-tests';
import React from 'react';

import { Checkbox } from '../Checkbox';

const onChange = jest.fn();

const renderWrapper = setupEnzyme(Checkbox, {
  htmlFor: 'some-label',
  label: 'Some label',
  onChange,
});

describe('<Checkbox>', () => {
  it('sets the input checked state when the prop is passed', () => {
    const { wrapper } = renderWrapper({ checked: true });

    expect(wrapper.find('input[type="checkbox"]').prop('checked')).toEqual(
      true
    );
  });

  it('calls the onChange callback when the input changes', () => {
    const onChange = jest.fn();

    const { wrapper } = renderWrapper({ onChange });

    wrapper.find('input[type="checkbox"]').simulate('change');

    expect(onChange).toHaveBeenCalled();
  });

  it('accepts JSX in the label', () => {
    const { wrapper } = renderWrapper({
      label: <img alt="my cat" src="cat.jpg" />,
    });

    expect(wrapper.find('img').length).toBe(1);
  });

  it.only('accepts an aria-label', () => {
    const { wrapper } = renderWrapper({
      'aria-label': 'i am a labeled checkbox',
    });
    expect(
      wrapper.find('input[aria-label="i am a labeled checkbox"]').length
    ).toBe(1);
  });
});
