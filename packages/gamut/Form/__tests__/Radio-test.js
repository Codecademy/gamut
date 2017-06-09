import React from 'react';
import { shallow } from 'enzyme';
import Radio from '../Radio';

describe('<Radio>', () => {
  it('sets the input checked state when the prop is passed', () => {
    const wrapper = shallow(
      <Radio
        htmlFor="some-label"
        checked
      />
    );
    expect(
      wrapper.find('input[type="radio"]').prop('checked')
    ).toEqual(true);
  });

  it('calls the onChange callback when the input changes', () => {
    const onChangeCallback = jest.fn();

    const wrapper = shallow(
      <Radio
        htmlFor="some-label"
        onChange={onChangeCallback}
        value="a"
      />
    );
    wrapper.find('input[type="radio"]').simulate(
      'change',
      {
        target: {
          value: 'a'
        }
      }
    );
    const firstArgument = onChangeCallback.mock.calls[0][0];
    expect(firstArgument.target.value).toBe('a');
  });

  it('accepts JSX in the label', () => {
    const wrapper = shallow(
      <Radio
        htmlFor="some-label"
        label={
          <img alt="my cat" src="cat.jpg" />
        }
      />
    );
    expect(wrapper.find('img').length).toBe(1);
  });
});
