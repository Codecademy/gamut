import React from 'react';
import { shallow } from 'enzyme';
import RadioGroup from '../RadioGroup';
import Radio from '../Radio';

describe('<RadioGroup>', () => {
  const onChangeCallback = () => {};
  const wrapper = shallow(
    <RadioGroup
      htmlForPrefix="what-salad-maker-do-you-prefer"
      name="what-salad-maker-do-you-prefer"
      onChange={onChangeCallback}
      data-testid="my-test-id"
    >
      <Radio label="Sweet Green" value="sweet-green" />
      <Radio label="Chopt" value="chopt" />
    </RadioGroup>
  );

  it('sets the htmlFor prop on the child', () => {
    expect(wrapper.find('Radio').first().prop('htmlFor')).toEqual(
      'what-salad-maker-do-you-prefer-0'
    );
  });

  it('sets the onChange prop on the child', () => {
    expect(wrapper.find('Radio').first().prop('onChange')).toEqual(
      onChangeCallback
    );
  });

  it('sets the name prop on the child', () => {
    expect(wrapper.find('Radio').first().prop('name')).toEqual(
      'what-salad-maker-do-you-prefer'
    );
  });

  it('sets any additional props on the outer div', () => {
    const getByTestId = wrapper.find('div[data-testid="my-test-id"]');
    expect(getByTestId.exists()).toBe(true);
    expect(getByTestId.isEmptyRender()).toBe(false);
  });
});
