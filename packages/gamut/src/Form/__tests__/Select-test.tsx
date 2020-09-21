import React from 'react';
import { shallow } from 'enzyme';
import { Select } from '../Select';

describe('<Select>', () => {
  const selectOptions = ['red', 'yellow', 'green'];
  const defaultProps = {
    options: selectOptions,
    id: 'colors',
  };

  it('sets the id prop on the select tag', () => {
    const wrapper = shallow(<Select {...defaultProps} />);

    expect(wrapper.find('select').props().id).toBe(defaultProps.id);
  });

  it('renders the same number of option as options', () => {
    const wrapper = shallow(<Select {...defaultProps} />);

    expect(wrapper.find('select').props().children).toHaveLength(
      defaultProps.options.length
    );
  });

  it('sets the key of option tags using the form of `${id}-${value} when the prop id is passed`', () => {
    const wrapper = shallow(<Select {...defaultProps} />);

    const keyWithId = `${defaultProps.id}-${selectOptions[0]}`;

    const getByTestId = wrapper.find(`option[data-testid="${keyWithId}"]`);

    expect(getByTestId.exists()).toBe(true);
  });
});
