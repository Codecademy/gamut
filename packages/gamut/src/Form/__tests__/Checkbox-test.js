import React from 'react';
import { shallow } from 'enzyme';
import Checkbox from '../Checkbox';
describe('<Checkbox>', () => {
  const defaultProps = {
    htmlFor: 'some-label',
    label: 'Some label',
  };
  it('sets the input checked state when the prop is passed', () => {
    const wrapper = shallow(
      React.createElement(
        Checkbox,
        Object.assign({}, defaultProps, { checked: true })
      )
    );
    expect(wrapper.find('input[type="checkbox"]').prop('checked')).toEqual(
      true
    );
  });
  it('calls the onChange callback when the input changes', () => {
    const onChangeCallback = jest.fn();
    const wrapper = shallow(
      React.createElement(
        Checkbox,
        Object.assign({}, defaultProps, {
          onChange: onChangeCallback,
          value: 'a',
        })
      )
    );
    wrapper.find('input[type="checkbox"]').simulate('change', {
      target: {
        value: 'a',
      },
    });
    const firstArgument = onChangeCallback.mock.calls[0][0];
    expect(firstArgument.target.value).toBe('a');
  });
  it('accepts JSX in the label', () => {
    const wrapper = shallow(
      React.createElement(
        Checkbox,
        Object.assign({}, defaultProps, {
          label: React.createElement('img', { alt: 'my cat', src: 'cat.jpg' }),
        })
      )
    );
    expect(wrapper.find('img').length).toBe(1);
  });
});
//# sourceMappingURL=Checkbox-test.js.map
