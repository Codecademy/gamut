import { setupEnzyme } from '@codecademy/gamut-tests';
import React from 'react';

import { Radio } from '../Radio';

const onChangeCallback = jest.fn();
const testid = 'my-test-id';

const renderWrapper = setupEnzyme(Radio, {
  htmlFor: 'some-label',
  checked: true,
  onChange: onChangeCallback,
  value: 'a',
  'data-testid': 'my-test-id',
});

describe('<Radio>', () => {
  it('sets the input checked state when the prop is passed', () => {
    const { wrapper } = renderWrapper();
    expect(wrapper.find('input[type="radio"]').prop('checked')).toEqual(true);
  });

  it('calls the onChange callback when the input changes', () => {
    const { wrapper } = renderWrapper();

    wrapper.find('input[type="radio"]').simulate('change', {
      target: {
        value: 'a',
      },
    });

    const firstArgument = onChangeCallback.mock.calls[0][0];
    expect(firstArgument.target.value).toBe('a');
  });

  it('accepts JSX in the label', () => {
    const { wrapper } = renderWrapper({
      label: <img alt="my cat" src="cat.jpg" />,
    });

    expect(wrapper.find('img').length).toBe(1);
  });

  it('accepts additional props not specified by the component', () => {
    const { wrapper } = renderWrapper();

    const getByTestId = wrapper.find(`input[data-testid="${testid}"]`);
    expect(getByTestId.exists()).toBe(true);
    expect(getByTestId.isEmptyRender()).toBe(false);
  });
});
